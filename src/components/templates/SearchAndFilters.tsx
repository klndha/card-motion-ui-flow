import React, { useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Search, Filter, X } from 'lucide-react';

interface SearchAndFiltersProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: { category?: string; status?: string }) => void;
  categories: string[];
  statuses: string[];
}

export function SearchAndFilters({ onSearch, onFilter, categories, statuses }: SearchAndFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const applyFilters = () => {
    onFilter({ category: categoryFilter, status: statusFilter });
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const clearFilters = () => {
    setCategoryFilter('');
    setStatusFilter('');
    onFilter({});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button variant="outline" className="ml-3" onClick={toggleFilter}>
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {isFilterOpen && (
        <div className="border rounded-md p-4 bg-secondary/30">
          <h4 className="text-sm font-medium mb-2">Filter Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full mt-1 p-2 border rounded-md bg-background"
                value={categoryFilter}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="w-full mt-1 p-2 border rounded-md bg-background"
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="ghost" onClick={clearFilters}>
              Clear
            </Button>
            <Button onClick={applyFilters}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
}
