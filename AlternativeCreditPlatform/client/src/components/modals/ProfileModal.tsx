import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form } from '@/components/ui/form';
import { RiCloseLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyIncome: string;
  employmentStatus: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch profile data
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['/api/profile'],
  });
  
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: profile?.firstName || 'John',
      lastName: profile?.lastName || 'Smith',
      email: profile?.email || 'john@example.com',
      phone: profile?.phone || '(555) 123-4567',
      monthlyIncome: profile?.monthlyIncome?.toString() || '5,000.00',
      employmentStatus: profile?.employmentStatus || 'full-time',
    },
  });
  
  // Update form values when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        monthlyIncome: profile.monthlyIncome?.toString(),
        employmentStatus: profile.employmentStatus,
      });
    }
  }, [profile, form]);
  
  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormValues) => 
      apiRequest('PUT', '/api/profile', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update profile: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <RiCloseLine className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Profile Picture & Stats */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="h-24 w-24 rounded-full bg-primary-500 mx-auto flex items-center justify-center text-white text-2xl font-medium">
                {form.getValues('firstName')?.[0] || 'J'}{form.getValues('lastName')?.[0] || 'S'}
              </div>
              <h4 className="mt-4 text-lg font-medium">{form.getValues('firstName')} {form.getValues('lastName')}</h4>
              <p className="text-sm text-gray-500">Member since June 2023</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium mb-3">Your Stats</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Credit Score:</span>
                  <span className="text-sm font-medium">742</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Active Loans:</span>
                  <span className="text-sm font-medium">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Active Investments:</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Success Rate:</span>
                  <span className="text-sm font-medium">100%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Profile Information */}
          <div className="md:col-span-2 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <h4 className="text-base font-medium mb-4">Personal Information</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="profile-firstname">First Name</Label>
                        <Input id="profile-firstname" {...form.register('firstName')} />
                      </div>
                      
                      <div>
                        <Label htmlFor="profile-lastname">Last Name</Label>
                        <Input id="profile-lastname" {...form.register('lastName')} />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="profile-email">Email Address</Label>
                      <Input id="profile-email" type="email" {...form.register('email')} />
                    </div>
                    
                    <div>
                      <Label htmlFor="profile-phone">Phone Number</Label>
                      <Input id="profile-phone" {...form.register('phone')} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-base font-medium mb-4">Financial Information</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="profile-income">Monthly Income</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          $
                        </span>
                        <Input 
                          id="profile-income" 
                          className="pl-7" 
                          {...form.register('monthlyIncome')} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="profile-employment">Employment Status</Label>
                      <Select 
                        onValueChange={(value) => form.setValue('employmentStatus', value)}
                        defaultValue={form.getValues('employmentStatus')}
                      >
                        <SelectTrigger id="profile-employment">
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="self-employed">Self-employed</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={updateProfileMutation.isPending}>
                    {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
