import React from 'react';
import { Student } from '../types';
import { MessageCircle, AlertCircle } from 'lucide-react';

interface FeesReminderProps {
  students: Student[];
}

const FeesReminder: React.FC<FeesReminderProps> = ({ students }) => {
  const defaulters = students.filter(s => (s.totalFees - s.feesPaid) > 0);

  const handleSendWhatsApp = () => {
    if (defaulters.length === 0) return;

    // Create a readable list
    const listText = defaulters
      .map(s => `${s.name} (${s.className}): ₹${s.totalFees - s.feesPaid}`)
      .join('\n');
    
    const message = `Following students have pending fees:\n\n${listText}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/919834252755?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="p-4 h-full flex flex-col animate-fade-in">
      
      <div className="flex-1 overflow-y-auto mb-20 space-y-3">
        {defaulters.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
             <AlertCircle size={48} className="mb-2 text-green-500" />
             <p>No pending fees!</p>
          </div>
        ) : (
          defaulters.map(student => (
            <div key={student.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{student.name}</h3>
                <p className="text-xs text-gray-500">{student.className} Std</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Due</p>
                <p className="font-bold text-red-600">₹{(student.totalFees - student.feesPaid).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleSendWhatsApp}
          disabled={defaulters.length === 0}
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle size={24} />
          Send WhatsApp Reminder
        </button>
      </div>
    </div>
  );
};

export default FeesReminder;