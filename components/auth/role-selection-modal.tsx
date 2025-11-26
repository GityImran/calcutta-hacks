'use client';

import { useState } from 'react';
import { ROLE_OPTIONS, RoleKey } from '@/types/auth';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelect: (role: RoleKey) => void;
  currentRole?: RoleKey | null;
}

export default function RoleSelectionModal({ 
  isOpen, 
  onClose, 
  onRoleSelect,
  currentRole 
}: RoleSelectionModalProps) {
  const [selectedRole, setSelectedRole] = useState<RoleKey | null>(currentRole || null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg">
          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-xl font-serif font-medium leading-6 text-gray-900">
                Tell us who you are
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                This helps us personalize your dashboard experience.
              </p>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="space-y-4">
                  {ROLE_OPTIONS.map((role) => (
                    <div
                      key={role.key}
                      onClick={() => setSelectedRole(role.key)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedRole === role.key
                          ? 'border-[#C58B2C] bg-[#FFF9EE] ring-2 ring-[#C58B2C]/20'
                          : 'border-gray-200 hover:border-[#C58B2C]/50 hover:bg-[#FFFDFA]'
                      }`}
                      role="radio"
                      aria-checked={selectedRole === role.key}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedRole(role.key);
                        }
                      }}
                    >
                      <div className="flex items-start">
                        <span className="text-2xl mr-3" aria-hidden="true">
                          {role.icon}
                        </span>
                        <div>
                          <div className="font-medium text-gray-900">{role.label}</div>
                          <div className="text-sm text-gray-500">{role.desc}</div>
                        </div>
                        {selectedRole === role.key && (
                          <span className="ml-auto text-[#C58B2C] text-xl" aria-hidden="true">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={!selectedRole}
                    className={`w-full px-4 py-3 text-base font-medium rounded-md shadow-sm sm:col-start-2 ${
                      selectedRole
                        ? 'bg-[#C58B2C] text-white hover:bg-[#B37D24] focus:ring-2 focus:ring-offset-2 focus:ring-[#C58B2C]'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full px-4 py-3 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C58B2C] sm:mt-0 sm:col-start-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
