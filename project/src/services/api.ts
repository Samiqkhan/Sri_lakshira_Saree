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

export const productService = {
  // Fetch all products with caching logic
  getAll: async (forceRefresh = false) => {
    if (productCache && !forceRefresh) return productCache;

    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, original_price, image_url, category, fabric, is_featured')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formatted = data.map(item => ({
      ...item,
      image: item.image_url ? getImageUrl(item.image_url) : '',
      isFeatured: item.is_featured,
      originalPrice: item.original_price,
    }));

    productCache = formatted;
    return formatted;
  },

  getById: async (id: string) => {
    // Check cache first for instant loading
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
    return {
      ...data,
      image: data.image_url ? getImageUrl(data.image_url) : '',
      isFeatured: data.is_featured,
      originalPrice: data.original_price,
      colors: data.colors || [],
      specifications: data.specifications || {}
    };
  },

  uploadImage: async (file: File) => {
    // Compress and convert to WebP before upload to save bandwidth
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
    const { image, isFeatured, originalPrice, colors, ...dbData } = productData;
    const { data, error } = await supabase
      .from('products')
      .insert([{
        ...dbData,
        image_url: image,
        is_featured: !!isFeatured,
        original_price: originalPrice,
        colors: colors || []
      }])
      .select()
      .single();

    if (error) throw error;
    productCache = null; // Reset cache so the new product shows up
    return {
      ...data,
      image: data.image_url ? getImageUrl(data.image_url) : '',
      isFeatured: data.is_featured,
      originalPrice: data.original_price,
      colors: data.colors || [],
      specifications: data.specifications || {}
    };
  },

  update: async (id: string, productData: any) => {
    const { image, isFeatured, originalPrice, colors, id: _id, createdAt, created_at, ...dbData } = productData;
    const { data, error } = await supabase
      .from('products')
      .update({
        ...dbData,
        image_url: image,
        is_featured: !!isFeatured,
        original_price: originalPrice,
        colors: colors || []
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    productCache = null;
    return {
      ...data,
      image: data.image_url ? getImageUrl(data.image_url) : '',
      isFeatured: data.is_featured,
      originalPrice: data.original_price,
      colors: data.colors || [],
      specifications: data.specifications || {}
    };
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