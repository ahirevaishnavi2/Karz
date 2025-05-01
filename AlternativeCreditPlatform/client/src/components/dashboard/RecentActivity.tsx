import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  RiHandCoinLine, 
  RiShieldCheckLine, 
  RiMoneyDollarCircleLine 
} from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  type: 'loan-payment' | 'credit-check' | 'investment';
  description: string;
  amount: string | null;
  date: string;
  status: 'completed' | 'pending' | 'active' | 'failed';
}

const RecentActivity = () => {
  // This would fetch the actual activities from the API
  const { data: activities, isLoading } = useQuery({
    queryKey: ['/api/activities'],
  });

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-xs font-medium text-gray-500 uppercase">Type</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase">Description</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase">Amount</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase">Date</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading recent activity...
                  </TableCell>
                </TableRow>
              ) : activities && activities.length > 0 ? (
                activities.map((activity: Activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {activity.type === 'loan-payment' && (
                          <RiHandCoinLine className="text-amber-500 mr-2" />
                        )}
                        {activity.type === 'credit-check' && (
                          <RiShieldCheckLine className="text-primary-500 mr-2" />
                        )}
                        {activity.type === 'investment' && (
                          <RiMoneyDollarCircleLine className="text-green-500 mr-2" />
                        )}
                        <span>
                          {activity.type === 'loan-payment' && 'Loan Payment'}
                          {activity.type === 'credit-check' && 'Credit Check'}
                          {activity.type === 'investment' && 'Investment'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{activity.description}</TableCell>
                    <TableCell className="text-sm font-medium text-gray-900">
                      {activity.amount ? `$${activity.amount}` : '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{activity.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${activity.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                          ${activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${activity.status === 'active' ? 'bg-blue-100 text-blue-800' : ''}
                          ${activity.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                          px-2 py-0.5 text-xs font-semibold rounded-full
                        `}
                      >
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No recent activities found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{activities?.length || 0}</span> of <span className="font-medium">{activities?.totalCount || 0}</span> activities
          </div>
          <div className="flex-1 flex justify-end">
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">View All <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
