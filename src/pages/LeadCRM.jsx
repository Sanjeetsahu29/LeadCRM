

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import FilterPanel from "../components/FilterPanel";
import AddLeadModal from "../components/AddLeadModal";
import Badge from "../components/Badge";
import initialLeads from "../utils/LeadListData.js";

const LeadCRM = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState(initialLeads);
  const [filteredLeads, setFilteredLeads] = useState(initialLeads);

  // Format date function
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };

  // Filter leads based on search term
  const searchFilteredLeads = useMemo(() => {
    if (!searchTerm) return filteredLeads;

    return filteredLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredLeads, searchTerm]);

  const handleAddLead = (newLead) => {
    const lead = {
      ...newLead,
      id: leads.length + 1,
      updatedAt: formatDate(new Date()),
    };
    setLeads([lead, ...leads]);
    setFilteredLeads([lead, ...filteredLeads]);
    setShowAddModal(false);
  };

 const handleApplyFilters = (filterConfig) => {
    // Start with all leads
    let filtered = leads;

    // Check if any filters have values
    const hasActiveFilters = filterConfig.filters.some(filter => filter.value);
    
    if (hasActiveFilters) {
      // Filter leads based on the active filters
      filtered = leads.filter((lead) => {
        const results = [];
        
        // Check each filter that has a value
        for (let filter of filterConfig.filters) {
          if (filter.value) {
            // Get the field name (convert "Lead Status" to "leadstatus")
            const fieldName = filter.field.toLowerCase().replace(" ", "");
            const leadFieldValue = lead[fieldName];
            
            // Check if lead's field value matches filter value
            const matches = leadFieldValue === filter.value;
            results.push(matches);
          }
        }
        
        // Decide based on match type (ALL or ANY)
        if (filterConfig.matchType === "ALL") {
          // All filters must match
          return results.every(result => result === true);
        } else {
          // At least one filter must match
          return results.some(result => result === true);
        }
      });
    }

    // Update the filtered leads and close filter panel
    setFilteredLeads(filtered);
    setShowFilters(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600 mt-1">
                  Manage and track your leads
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    This Frontend Task is created by Sanjeet on 26th May 2025
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Lead
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Panel */}
            <FilterPanel
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              onApplyFilters={handleApplyFilters}
            />

            {/* Leads Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                          Name
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                          Contact
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                          Status
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                          Qualification
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                          Interest
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                          Source
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                          Assigned To
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                          Updated At
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchFilteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                            {lead.name}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.contact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={lead.status}>{lead.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.qualification}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.interest}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.source}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.updatedAt}
                        </td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {searchFilteredLeads.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No leads found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : "Get started by adding your first lead"}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Add Lead
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Results Count */}
            {searchFilteredLeads.length > 0 && (
              <div className="mt-4 text-sm text-gray-500">
                Showing {searchFilteredLeads.length} of {leads.length} leads
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddLead={handleAddLead}
      />
    </div>
  );
};

export default LeadCRM;
