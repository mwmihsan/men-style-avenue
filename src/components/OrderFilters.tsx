
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface OrderFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const OrderFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }: OrderFiltersProps) => {
  return (
    <Card className="bg-brand-gray border-brand-gold/20 mb-6">
      <CardContent className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-brand-dark border-brand-gold/20 text-white placeholder:text-gray-500 h-12"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-brand-dark border-brand-gold/20 text-white h-12">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-brand-gray border-brand-gold/20">
            <SelectItem value="all" className="text-white">All Orders</SelectItem>
            <SelectItem value="pending" className="text-white">Pending</SelectItem>
            <SelectItem value="confirmed" className="text-white">Confirmed</SelectItem>
            <SelectItem value="processing" className="text-white">Processing</SelectItem>
            <SelectItem value="shipped" className="text-white">Shipped</SelectItem>
            <SelectItem value="delivered" className="text-white">Delivered</SelectItem>
            <SelectItem value="cancelled" className="text-white">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default OrderFilters;
