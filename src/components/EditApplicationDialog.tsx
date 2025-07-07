
import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, Server, User, Clock, FileText, AlertTriangle, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface AppData {
  appName: string;
  changeNumber: string;
  applicationOwner: string;
  maintenanceWindow: string;
  changeDescription: string;
  infrastructureImpact: string;
  hosts: string[];
  disabled?: boolean;
}

interface EditApplicationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  application: AppData | null;
  onSave: (updatedApp: AppData) => Promise<void>;
  isLoading?: boolean;
  isNew?: boolean;
}

const EditApplicationDialog: React.FC<EditApplicationDialogProps> = ({
  isOpen,
  onClose,
  application,
  onSave,
  isLoading = false,
  isNew = false
}) => {
  const [editForm, setEditForm] = useState<AppData | null>(null);
  const [rawHostsInput, setRawHostsInput] = useState('');


  useEffect(() => {
    if (application) {
      setEditForm({ ...application });
      setRawHostsInput(application.hosts.join('\n')); // ← Add this line

    }
  }, [application, isNew]);

  const handleFormChange = (field: keyof AppData, value: string | string[]) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };
{/* This is a single-line comment within JSX 
  const handleHostsChange = (value: string) => {
    if (editForm) {
      // Split by both comma and newline, then filter empty strings and trim whitespace
      const hosts = value
        .split(/[\n,]+/)
        .map(host => host.trim())
        .filter(host => host.length > 0);
      setEditForm({ ...editForm, hosts });
    }
  }; */}

 const handleHostsChange = (value: string) => {
  setRawHostsInput(value); // Preserve typed value

  if (editForm) {
    const hosts = value
      .split(/[\n,]+/)
      .map(host => host.trim())
      .filter(Boolean);

    setEditForm({ ...editForm, hosts });
  }
};


  const handleSave = async () => {
    if (editForm) {
      await onSave(editForm);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!editForm) return null;

  const isFormValid = editForm.appName.trim() !== '' && editForm.changeNumber.trim() !== '';

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-white">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              {isNew ? <Plus className="w-6 h-6 text-white" /> : <Edit3 className="w-6 h-6 text-white" />}
            </div>
            <div className="flex flex-col">
              <span>{isNew ? 'Add New Application' : 'Edit Application'}</span>
              {!isNew && <span className="text-base font-normal text-slate-500">{editForm.appName}</span>}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            {/* Application Details */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-blue-900">
                <Server className="w-5 h-5" />
                Application Details
              </h3>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="appName" className="text-sm font-semibold text-slate-700 mb-2 block">
                    Application Name *
                  </Label>
                  <Input
                    id="appName"
                    value={editForm.appName}
                    onChange={(e) => handleFormChange('appName', e.target.value)}
                    className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-11 text-base"
                    placeholder="Enter application name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="changeNumber" className="text-sm font-semibold text-slate-700 mb-2 block">
                    Change Number *
                  </Label>
                  <Input
                    id="changeNumber"
                    value={editForm.changeNumber}
                    onChange={(e) => handleFormChange('changeNumber', e.target.value)}
                    className="bg-white font-mono border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-11 text-base"
                    placeholder="CRQ1000000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicationOwner" className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Application Owner
                  </Label>
                  <Input
                    id="applicationOwner"
                    value={editForm.applicationOwner}
                    onChange={(e) => handleFormChange('applicationOwner', e.target.value)}
                    className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-11 text-base"
                    placeholder="Owner name"
                  />
                </div>
                <div>
                  <Label htmlFor="maintenanceWindow" className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Maintenance Window
                  </Label>
                  <Input
                    id="maintenanceWindow"
                    value={editForm.maintenanceWindow}
                    onChange={(e) => handleFormChange('maintenanceWindow', e.target.value)}
                    className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-11 text-base"
                    placeholder="Sat, 12:00 AM – 4:00 AM"
                  />
                </div>
              </div>
            </div>

            {/* Infrastructure Impact */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-5 h-5" />
                Infrastructure Impact
              </h3>
              <div>
                <Label htmlFor="infrastructureImpact" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Impact Description
                </Label>
                <Input
                  id="infrastructureImpact"
                  value={editForm.infrastructureImpact}
                  onChange={(e) => handleFormChange('infrastructureImpact', e.target.value)}
                  className="bg-white border-amber-200 focus:border-amber-500 focus:ring-amber-500 h-11 text-base"
                  placeholder="X servers affected"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Change Information & Hosts */}
          <div className="space-y-6">
            {/* Change Description */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-900">
                <FileText className="w-5 h-5" />
                Change Information
              </h3>
              <div>
                <Label htmlFor="changeDescription" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Change Description
                </Label>
                <Textarea
                  id="changeDescription"
                  value={editForm.changeDescription}
                  onChange={(e) => handleFormChange('changeDescription', e.target.value)}
                  className="bg-white min-h-[120px] resize-y border-green-200 focus:border-green-500 focus:ring-green-500 text-base"
                  placeholder="Describe the changes being made..."
                />
              </div>
            </div>

            {/* Host Configuration */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-900">
                  <Server className="w-5 h-5" />
                  Host Configuration
                </h3>
                <Badge variant="outline" className="bg-white text-purple-700 border-purple-300 font-semibold">
                  {editForm.hosts.length} {editForm.hosts.length === 1 ? 'host' : 'hosts'}
                </Badge>
              </div>
              <div>
                <Label htmlFor="hosts" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Server Hostnames
                </Label>
                <Textarea
                  id="hosts"
                  //value={editForm.hosts.join('\n')}
		  value={rawHostsInput}
                  onChange={(e) => handleHostsChange(e.target.value)}
                  className="bg-white min-h-[200px] font-mono text-sm border-purple-200 focus:border-purple-500 focus:ring-purple-500 resize-y"
                  placeholder={`server1.company.com
server2.company.com
server3.company.com

Or use commas:
server1.company.com, server2.company.com`}
                />
                <div className="mt-3 p-3 bg-purple-100 rounded-lg">
                  <p className="text-xs text-purple-700 font-medium">
                    💡 <strong>Tip:</strong> Enter each hostname on a new line OR separate with commas. Both formats work perfectly!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-8 border-t bg-white">
          <div className="text-sm text-slate-500">
            {!isFormValid && (
              <span className="text-red-500 font-medium">
                * Application Name and Change Number are required
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="gap-2 h-11 px-6 border-slate-300 hover:bg-slate-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading || !isFormValid}
              className="gap-2 h-11 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : isNew ? 'Create Application' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditApplicationDialog;
