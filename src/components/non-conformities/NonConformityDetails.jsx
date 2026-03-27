import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { format } from 'date-fns';
import { Calendar, User, AlertCircle, CheckCircle2, Clock, FileText, MessageSquare } from 'lucide-react';

export function NonConformityDetails({ nc }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high':     return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':   return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':      return 'bg-blue-100 text-blue-700 border-blue-200';
      default:         return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':           return 'bg-blue-100 text-blue-700';
      case 'in-progress':    return 'bg-amber-100 text-amber-700';
      case 'pending-review': return 'bg-purple-100 text-purple-700';
      case 'closed':         return 'bg-green-100 text-green-700';
      default:               return 'bg-gray-100 text-gray-700';
    }
  };

  const completedActions = nc.correctiveActions.filter(
    (action) => action.status === 'completed'
  ).length;
  const totalActions = nc.correctiveActions.length;
  const progressPercentage = totalActions > 0 ? (completedActions / totalActions) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{nc.title}</h2>
            <p className="text-gray-500 mt-1">{nc.id}</p>
          </div>
          <Badge className={getStatusColor(nc.status)}>
            {nc.status.replace('-', ' ')}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className={getSeverityColor(nc.severity)}>{nc.severity}</Badge>
          <Badge className="bg-purple-100 text-purple-700">{nc.priority} priority</Badge>
          <Badge variant="outline">{nc.category}</Badge>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700">{nc.description}</p>
      </div>

      {/* Key Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Assigned To</p>
            <p className="font-medium text-gray-900">{nc.assignedTo}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Reported By</p>
            <p className="font-medium text-gray-900">{nc.reportedBy}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Reported Date</p>
            <p className="font-medium text-gray-900">
              {format(nc.reportedAt, 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="font-medium text-gray-900">
              {format(nc.deadline, 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Corrective Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Corrective Actions</h3>
          <span className="text-sm text-gray-500">
            {completedActions} of {totalActions} completed
          </span>
        </div>
        <Progress value={progressPercentage} className="mb-4" />
        <div className="space-y-3">
          {nc.correctiveActions.map((action) => (
            <div
              key={action.id}
              className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
            >
              <div className="mt-0.5">
                {action.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : action.status === 'in-progress' ? (
                  <Clock className="w-5 h-5 text-amber-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{action.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>Assigned to: {action.assignedTo}</span>
                  <span>Due: {format(action.dueDate, 'MMM dd, yyyy')}</span>
                  {action.completedAt && (
                    <span className="text-green-600">
                      Completed: {format(action.completedAt, 'MMM dd, yyyy')}
                    </span>
                  )}
                </div>
              </div>
              <Badge
                className={
                  action.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : action.status === 'in-progress'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-700'
                }
              >
                {action.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence */}
      {nc.evidence.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Evidence</h3>
            <div className="space-y-2">
              {nc.evidence.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-900">{file}</span>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Comments */}
      {nc.comments.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Comments</h3>
            <div className="space-y-4">
              {nc.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{comment.userName}</span>
                      <span className="text-xs text-gray-500">
                        {format(comment.createdAt, 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Add Comment</Button>
        <Button variant="outline">Upload Evidence</Button>
        {nc.status !== 'closed' && (
          <Button className="bg-blue-600 hover:bg-blue-700">Update Status</Button>
        )}
      </div>
    </div>
  );
}