import { supabase } from '../lib/supabase';

// Helper to get the full public URL for an image
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already a full URL
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
};

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
      specifications: item.specifications || {}
    }));
  },

  // 2. GET SINGLE PRODUCT BY ID (New Function)
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
      specifications: data.specifications || {}
    };
  },

  // 3. Upload Image
  uploadImage: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) throw error;
    return filePath; // Return path, we generate URL later
  },

  // 4. Create Product
  create: async (productData: any) => {
    const { image, id, ...dbData } = productData;
    const { data, error } = await supabase
      .from('products')
      .insert([{ ...dbData, image_url: image }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 5. Update Product
  update: async (id: string, productData: any) => {
    const { image, ...dbData } = productData;
    const { data, error } = await supabase
      .from('products')
      .update({ ...dbData, image_url: image })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
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

export const orderService = {
  // 1. Create a new order (Used by Checkout)
  create: async (orderData: any) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 2. Fetch all orders (Used by Admin Panel)
  getAll: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // 3. Update order status (Used by Admin Panel)
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

  // ... inside orderService ...

  // 4. Upload Payment Screenshot
  uploadProof: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('payment-proofs')
      .upload(filePath, file);

    if (error) throw error;
    
    // Get Public URL
    const { data } = supabase.storage.from('payment-proofs').getPublicUrl(filePath);
    return data.publicUrl;
  },

  // 5. Link Proof to Order
  addPaymentProof: async (orderId: string, proofUrl: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ 
        payment_proof: proofUrl,
        status: 'processing' // Auto-move to processing once paid
      })
      .eq('id', orderId);

    if (error) throw error;
    return true;
  }
};

