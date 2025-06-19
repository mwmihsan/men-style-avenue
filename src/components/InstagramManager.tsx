
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Loader2, Instagram, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const InstagramManager = () => {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Mock data - in real app this would come from a database
  const [posts, setPosts] = useState<InstagramPost[]>([
    {
      id: '1',
      image: '/lovable-uploads/66a209a7-ad7d-4c9e-ae70-bc9edccbd135.png',
      caption: 'New collection of premium formal shirts now available! #4MenMensWear #FormalWear',
      likes: 45,
      comments: 8,
      timestamp: '2 days ago'
    },
    {
      id: '2',
      image: '/lovable-uploads/a6517966-9226-4e24-9a2a-ab006d202a9a.png',
      caption: 'Casual Friday looks sorted with our latest casual wear collection 👔',
      likes: 32,
      comments: 5,
      timestamp: '4 days ago'
    },
    {
      id: '3',
      image: '/lovable-uploads/b33654c5-c79a-454b-8132-6b99f8698b94.png',
      caption: 'Traditional meets modern - check out our ethnic wear collection',
      likes: 28,
      comments: 3,
      timestamp: '1 week ago'
    }
  ]);

  const [formData, setFormData] = useState({
    image: '',
    caption: '',
    likes: 0,
    comments: 0,
    timestamp: ''
  });

  const handleEdit = (post: InstagramPost) => {
    setEditingPost(post);
    setFormData({
      image: post.image,
      caption: post.caption,
      likes: post.likes,
      comments: post.comments,
      timestamp: post.timestamp
    });
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPost(null);
    setFormData({
      image: '',
      caption: '',
      likes: 0,
      comments: 0,
      timestamp: 'now'
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.image || !formData.caption) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...formData }
          : post
      ));
      toast({
        title: "Success",
        description: "Instagram post updated successfully"
      });
    } else {
      // Add new post
      const newPost: InstagramPost = {
        id: Date.now().toString(),
        ...formData
      };
      setPosts([newPost, ...posts]);
      toast({
        title: "Success",
        description: "Instagram post added successfully"
      });
    }
    
    setIsEditModalOpen(false);
    setFormData({
      image: '',
      caption: '',
      likes: 0,
      comments: 0,
      timestamp: ''
    });
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this Instagram post?')) {
      setPosts(posts.filter(post => post.id !== id));
      toast({
        title: "Success",
        description: "Instagram post deleted successfully"
      });
    }
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/4men_mens_wear?igsh=MWRpZ295bXJoanJsZw==', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-white">Instagram Management</h2>
          <p className="text-gray-400 text-sm">Manage your Instagram feed posts</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleInstagramClick} variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white">
            <Instagram className="w-4 h-4 mr-2" />
            Visit Instagram
          </Button>
          <Button onClick={handleAdd} className="btn-gold">
            <Plus className="w-4 h-4 mr-2" />
            Add Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="bg-brand-gray border-brand-gold/20">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 space-x-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => handleEdit(post)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {post.caption}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <div className="flex space-x-4">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
                <span>{post.timestamp}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit/Add Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-brand-gray border-brand-gold/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-playfair">
              {editingPost ? 'Edit Instagram Post' : 'Add New Instagram Post'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <ImageUpload
              currentImage={formData.image}
              onImageUploaded={(url) => setFormData({...formData, image: url})}
            />
            
            <div>
              <Label htmlFor="caption" className="text-white">Caption *</Label>
              <Textarea
                id="caption"
                value={formData.caption}
                onChange={(e) => setFormData({...formData, caption: e.target.value})}
                className="bg-brand-dark border-brand-gold/20 text-white placeholder:text-gray-400"
                placeholder="Enter your Instagram caption..."
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="likes" className="text-white">Likes</Label>
                <Input
                  id="likes"
                  type="number"
                  value={formData.likes}
                  onChange={(e) => setFormData({...formData, likes: parseInt(e.target.value) || 0})}
                  className="bg-brand-dark border-brand-gold/20 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="comments" className="text-white">Comments</Label>
                <Input
                  id="comments"
                  type="number"
                  value={formData.comments}
                  onChange={(e) => setFormData({...formData, comments: parseInt(e.target.value) || 0})}
                  className="bg-brand-dark border-brand-gold/20 text-white"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="timestamp" className="text-white">Timestamp</Label>
              <Input
                id="timestamp"
                value={formData.timestamp}
                onChange={(e) => setFormData({...formData, timestamp: e.target.value})}
                placeholder="e.g., 2 days ago, 1 week ago, now"
                className="bg-brand-dark border-brand-gold/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)} 
              disabled={submitting}
              className="border-brand-gold/20 text-white hover:bg-brand-gold/10"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="btn-gold" disabled={submitting}>
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingPost ? 'Update' : 'Add'} Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstagramManager;
