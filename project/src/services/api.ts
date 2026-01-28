import { supabase } from '../lib/supabase';

// Helper to get the full public URL for an image
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
      videoUrl: item.video_url ? getImageUrl(item.video_url) : '',
      isFeatured: item.is_featured, // Map DB snake_case to Frontend camelCase
      colors: item.colors || [],    // Map colors array
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
      videoUrl: data.video_url ? getImageUrl(data.video_url) : '',
      isFeatured: data.is_featured,
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
    
    // Return the path (we generate the full URL in getImageUrl)
    return filePath;
  },

  // 4. Upload Product Video (Optional)
  uploadVideo: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('product-videos')
      .upload(filePath, file);

    if (error) throw error;
    
    return filePath;
  },

  // 5. Create Product
  create: async (productData: any) => {
    // Extract frontend fields
    const { image, videoUrl, isFeatured, colors, ...dbData } = productData;
    
    // Validate isFeatured is a strict boolean
    const isFeaturedBoolean = !!isFeatured; 

    const { data, error } = await supabase
      .from('products')
      .insert([{ 
        ...dbData, 
        image_url: image, 
        video_url: videoUrl,
        is_featured: isFeaturedBoolean, // Send strict boolean to DB
        colors: colors || []          // Send colors array
      }])
      .select()
      .single();

    if (error) throw error;
    return { 
        ...data, 
        image: data.image_url, 
        videoUrl: data.video_url,
        isFeatured: data.is_featured,
        colors: data.colors 
    };
  },

  // 6. Update Product
  update: async (id: string, productData: any) => {
    const { image, videoUrl, isFeatured, colors, ...dbData } = productData;

    // Validate isFeatured is a strict boolean
    const isFeaturedBoolean = !!isFeatured;

    const { data, error } = await supabase
      .from('products')
      .update({ 
        ...dbData, 
        image_url: image, 
        video_url: videoUrl,
        is_featured: isFeaturedBoolean,
        colors: colors || []
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { 
        ...data, 
        image: data.image_url, 
        videoUrl: data.video_url,
        isFeatured: data.is_featured,
        colors: data.colors 
    };
  },

  // 7. Delete Product
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
    
    // Get Public URL directly for proofs
    const { data } = supabase.storage.from('payment-proofs').getPublicUrl(filePath);
    return data.publicUrl;
  },

  // 5. Link Proof to Order
  addPaymentProof: async (orderId: string, proofUrl: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ 
        payment_proof: proofUrl,
        status: 'processing', // Move to processing automatically
        payment_status: 'paid' 
      })
      .eq('id', orderId);

    if (error) throw error;
    return true;
  }
};