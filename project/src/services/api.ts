import { supabase } from '../lib/supabase';
import { convertToWebP } from '../utils/imageUtils';

// Simple cache to prevent redundant API calls
let productCache: any[] | null = null;

const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
};

// Parse pipe-separated image paths from image_url field
const parseImagePaths = (imageUrl: string | null): string[] => {
  if (!imageUrl) return [];
  return imageUrl.split('|').filter(Boolean);
};

const formatProduct = (data: any) => {
  const allPaths = parseImagePaths(data.image_url);
  const primaryPath = allPaths[0] || '';
  const additionalPaths = allPaths.slice(1);
  return {
    ...data,
    image: primaryPath ? getImageUrl(primaryPath) : '',
    images: additionalPaths.map(p => getImageUrl(p)),
    description: data.description || '',
    isFeatured: data.is_featured,
    originalPrice: data.original_price,
    colors: data.colors || [],
    specifications: data.specifications || {}
  };
};

export const productService = {
  // Fetch all products with caching logic
  getAll: async (forceRefresh = false) => {
    if (productCache && !forceRefresh) return productCache;

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formatted = data.map(formatProduct);
    productCache = formatted;
    return formatted;
  },

  getById: async (id: string) => {
    if (productCache) {
      const cached = productCache.find(p => p.id === id);
      if (cached) return cached;
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return formatProduct(data);
  },

  uploadImage: async (file: File) => {
    const webpFile = await convertToWebP(file, 0.8);
    const fileName = `${crypto.randomUUID()}.webp`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, webpFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    return fileName;
  },

  create: async (productData: any) => {
    // Combine primary + additional images as pipe-separated string in image_url
    const allImages = [productData.image, ...(productData.images || [])].filter(Boolean);
    const insertPayload: any = {
      name: productData.name,
      price: productData.price,
      category: productData.category,
      fabric: productData.fabric,
      stock: productData.stock,
      status: productData.status,
      specifications: productData.specifications || {},
      image_url: allImages.join('|'),
      is_featured: !!productData.isFeatured,
      original_price: productData.originalPrice,
      colors: productData.colors || []
    };
    if (productData.description) insertPayload.description = productData.description;
    const { data, error } = await supabase
      .from('products')
      .insert([insertPayload])
      .select()
      .single();

    if (error) throw error;
    productCache = null;
    return formatProduct(data);
  },

  update: async (id: string, productData: any) => {
    const allImages = [productData.image, ...(productData.images || [])].filter(Boolean);
    const updatePayload: any = {
      name: productData.name,
      price: productData.price,
      category: productData.category,
      fabric: productData.fabric,
      stock: productData.stock,
      status: productData.status,
      specifications: productData.specifications || {},
      image_url: allImages.join('|'),
      is_featured: !!productData.isFeatured,
      original_price: productData.originalPrice,
      colors: productData.colors || []
    };
    if (productData.description) updatePayload.description = productData.description;
    const { data, error } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    productCache = null;
    return formatProduct(data);
  },

  delete: async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    productCache = null;
    return true;
  }
};

export const orderService = {
  create: async (orderData: any) => {
    const { data, error } = await supabase.from('orders').insert([orderData]).select().single();
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: any) => {
    const { data, error } = await supabase.from('orders').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  uploadPaymentProof: async (file: File) => {
    // Compress and convert to WebP before upload
    const webpFile = await convertToWebP(file, 0.8);
    const fileName = `${crypto.randomUUID()}-proof.webp`;

    const { error } = await supabase.storage
      .from('payment-proofs')
      .upload(fileName, webpFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get the public URL
    const { data } = supabase.storage.from('payment-proofs').getPublicUrl(fileName);
    return data.publicUrl;
  },

  getAll: async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};