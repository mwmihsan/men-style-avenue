
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2, Plus } from 'lucide-react';

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  description?: string;
  isOutOfStock: boolean;
  isNewArrival: boolean;
  hasOffer: boolean;
  offerText?: string;
}

const AdminPanel = () => {
  const [products, setProducts] = useState<AdminProduct[]>([
    { id: '1', name: 'Classic White Dress Shirt', category: 'Long-Sleeved Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,500 - 4,500', isOutOfStock: false, isNewArrival: true, hasOffer: false },
    { id: '2', name: 'Navy Polo Shirt', category: 'Collar T-Shirts', image: 'https://images.unsplash.com/photo-1583743814966-8936f37f6c8c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 1,500 - 2,800', isOutOfStock: false, isNewArrival: false, hasOffer: true, offerText: '20% OFF' },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState<Partial<AdminProduct>>({});

  const categories = [
    'Long-Sleeved Shirts',
    'Short-Sleeved Shirts', 
    'Collar T-Shirts',
    'Round Neck T-Shirts',
    'Long-Sleeved T-Shirts',
    'Denim Trousers',
    'Pants & Trousers',
    'Accessories'
  ];

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData(product);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      image: '',
      price: '',
      description: '',
      isOutOfStock: false,
      isNewArrival: false,
      hasOffer: false,
      offerText: ''
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.price) return;

    const productData: AdminProduct = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name || '',
      category: formData.category || '',
      image: formData.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      price: formData.price || '',
      description: formData.description,
      isOutOfStock: formData.isOutOfStock || false,
      isNewArrival: formData.isNewArrival || false,
      hasOffer: formData.hasOffer || false,
      offerText: formData.offerText
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts([...products, productData]);
    }

    setIsEditModalOpen(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const getStatusBadges = (product: AdminProduct) => {
    const badges = [];
    if (product.isOutOfStock) badges.push(<Badge key="stock" variant="destructive">Out of Stock</Badge>);
    if (product.isNewArrival) badges.push(<Badge key="new" className="bg-green-500">New Arrival</Badge>);
    if (product.hasOffer) badges.push(<Badge key="offer" className="bg-orange-500">{product.offerText || 'Offer'}</Badge>);
    return badges;
  };

  return (
    <div className="min-h-screen bg-brand-dark p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-white">Admin Panel</h1>
          <Button onClick={handleAdd} className="btn-gold">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-brand-gray border-brand-gold/20">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 space-x-2">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{product.category}</p>
                <p className="text-brand-gold mb-3">{product.price}</p>
                <div className="flex flex-wrap gap-2">
                  {getStatusBadges(product)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit/Add Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl bg-brand-gray border-brand-gold/20">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-brand-dark border-brand-gold/20 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="bg-brand-dark border-brand-gold/20 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price" className="text-white">Price</Label>
                  <Input
                    id="price"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Rs. 1,500 - 2,500"
                    className="bg-brand-dark border-brand-gold/20 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image" className="text-white">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="bg-brand-dark border-brand-gold/20 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-brand-dark border-brand-gold/20 text-white"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="outOfStock"
                      checked={formData.isOutOfStock || false}
                      onCheckedChange={(checked) => setFormData({...formData, isOutOfStock: checked as boolean})}
                    />
                    <Label htmlFor="outOfStock" className="text-white">Out of Stock</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="newArrival"
                      checked={formData.isNewArrival || false}
                      onCheckedChange={(checked) => setFormData({...formData, isNewArrival: checked as boolean})}
                    />
                    <Label htmlFor="newArrival" className="text-white">New Arrival</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasOffer"
                      checked={formData.hasOffer || false}
                      onCheckedChange={(checked) => setFormData({...formData, hasOffer: checked as boolean})}
                    />
                    <Label htmlFor="hasOffer" className="text-white">Has Offer</Label>
                  </div>
                  
                  {formData.hasOffer && (
                    <div>
                      <Label htmlFor="offerText" className="text-white">Offer Text</Label>
                      <Input
                        id="offerText"
                        value={formData.offerText || ''}
                        onChange={(e) => setFormData({...formData, offerText: e.target.value})}
                        placeholder="20% OFF, Buy 1 Get 1, etc."
                        className="bg-brand-dark border-brand-gold/20 text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="btn-gold">
                {editingProduct ? 'Update' : 'Add'} Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPanel;
