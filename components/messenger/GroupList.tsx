'use client';

import React from 'react';

interface Group {
  id: string;
  name: string;
  image?: string;
  description?: string;
  memberCount?: number;
}

interface GroupListProps {
  groups: Group[];
  selectedGroup: string | null;
  onSelectGroup: (groupId: string) => void;
}

export const GroupList: React.FC<GroupListProps> = ({
  groups,
  selectedGroup,
  onSelectGroup,
}) => {
  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="w-full border-t border-gray-200 bg-gray-50">
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
          👥 Группы
        </p>
        <div className="space-y-1">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all group relative ${
                selectedGroup === group.id
                  ? 'bg-primary-100'
                  : 'hover:bg-gray-100'
              }`}
            >
              {/* Orange bar on left */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-r transition-all ${
                  selectedGroup === group.id
                    ? 'bg-primary-600'
                    : 'bg-transparent group-hover:bg-primary-400'
                }`}
              ></div>

              {/* Group icon/image */}
              {group.image ? (
                <img
                  src={group.image}
                  alt={group.name}
                  className="h-10 w-10 rounded-lg object-cover flex-shrink-0 mt-0.5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="h-10 w-10 rounded-lg bg-primary-200 flex items-center justify-center flex-shrink-0 text-primary-700 font-semibold">
                  👥
                </div>
              )}

              {/* Group info */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p
                  className={`text-sm font-semibold truncate ${
                    selectedGroup === group.id
                      ? 'text-primary-700'
                      : 'text-dark group-hover:text-primary-600'
                  }`}
                >
                  {group.name}
                </p>
                <p className="text-xs text-gray-500">
                  {group.memberCount || 0} участников
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
