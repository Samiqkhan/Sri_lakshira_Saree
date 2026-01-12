import { supabase } from '../lib/supabase';
// Helper to get the full public URL for an image
const getImageUrl = (path: string) => {
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
    
    // Map database fields to your frontend interface if needed
    return data.map(item => ({
      ...item,
      image: item.image_url, // Map image_url to image
      specifications: item.specifications || {}
    }));
  },

  // 2. Upload Image
  uploadImage: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) throw error;
    return getImageUrl(filePath);
  },

  // 3. Create Product
  create: async (productData: any) => {
    // Prepare data for DB (rename image -> image_url)
    const { image, id, ...dbData } = productData;
    
    const { data, error } = await supabase
      .from('products')
      .insert([{ ...dbData, image_url: image }])
      .select()
      .single();

    if (error) throw error;
    return { ...data, image: data.image_url };
  },

  // 4. Update Product
  update: async (id: string, productData: any) => {
    const { image, ...dbData } = productData;
    
    const { data, error } = await supabase
      .from('products')
      .update({ ...dbData, image_url: image })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { ...data, image: data.image_url };
  },

  // 5. Delete Product
  delete: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};