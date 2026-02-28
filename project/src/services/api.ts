import { supabase } from '../lib/supabase';

// Helper to get the full public URL for a product image
// Handles both raw file paths and already complete URLs
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already a full URL
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
};

// --- PRODUCT SERVICE ---
export const productService = {
  // 1. Fetch all products
  getAll: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      ...item,
      image: item.image_url ? getImageUrl(item.image_url) : '',
      // REMOVED videoUrl mapping
      isFeatured: item.is_featured,
      originalPrice: item.original_price,
      colors: item.colors || [],
      specifications: item.specifications || {}
    }));
  },

  // 2. Get Single Product by ID
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return {
      ...data,
      image: data.image_url ? getImageUrl(data.image_url) : '',
      // REMOVED videoUrl mapping
      isFeatured: data.is_featured,
      originalPrice: data.original_price,
      colors: data.colors || [],
      specifications: data.specifications || {}
    };
  },

  // 3. Upload Product Image
  uploadImage: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) throw error;

    return filePath;
  },

  // REMOVED uploadVideo function entirely

  // 4. Create Product
  create: async (productData: any) => {
    // Extract frontend fields (Removed videoUrl destructuring)
    const { image, isFeatured, originalPrice, colors, ...dbData } = productData;

    const isFeaturedBoolean = !!isFeatured;

    const { data, error } = await supabase
      .from('products')
      .insert([{
        ...dbData,
        image_url: image,
        // REMOVED video_url field
        is_featured: isFeaturedBoolean,
        original_price: originalPrice,
        colors: colors || []
      }])
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      image: data.image_url,
      isFeatured: data.is_featured,
      originalPrice: data.original_price,
      colors: data.colors
    };
  },

  // 5. Update Product
  update: async (id: string, productData: any) => {
    // Removed videoUrl destructuring
    const { image, isFeatured, originalPrice, colors, ...dbData } = productData;

    const isFeaturedBoolean = !!isFeatured;

    const { data, error } = await supabase
      .from('products')
      .update({
        ...dbData,
        image_url: image,
        // REMOVED video_url field
        is_featured: isFeaturedBoolean,
        original_price: originalPrice,
        colors: colors || []
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      image: data.image_url,
      isFeatured: data.is_featured,
      originalPrice: data.original_price,
      colors: data.colors
    };
  },

  // 6. Delete Product
  delete: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

// --- ORDER SERVICE ---
export const orderService = {
  // 1. Create Order
  create: async (orderData: any) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 2. Fetch All Orders
  getAll: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // 3. Update Order Status
  updateStatus: async (id: string, status: string) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 4. Upload Payment Proof
  uploadProof: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('payment-proofs')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage.from('payment-proofs').getPublicUrl(filePath);
    return data.publicUrl;
  },

  // 5. Link Proof to Order
  addPaymentProof: async (orderId: string, proofUrl: string) => {
    const { error } = await supabase
      .from('orders')
      .update({
        payment_proof: proofUrl,
        status: 'processing',
        payment_status: 'paid'
      })
      .eq('id', orderId);

    if (error) throw error;
    return true;
  }
};