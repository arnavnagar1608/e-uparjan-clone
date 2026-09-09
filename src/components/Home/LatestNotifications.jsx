import React from 'react';
import { Download, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LatestNotifications = () => {
  const { t } = useLanguage();

  const notifications = [
    { id: 1, title: t('notif_1'), dept: t('dept_1'), date: "05-Sep-2026" },
    { id: 2, title: t('notif_2'), dept: t('dept_2'), date: "01-Sep-2026" },
    { id: 3, title: t('notif_3'), dept: t('dept_3'), date: "28-Aug-2026" },
    { id: 4, title: t('notif_4'), dept: t('dept_4'), date: "25-Aug-2026" },
  ];

  return (
    <section>
      <div className="flex items-center mb-6 justify-between border-b border-gray-300 pb-2">
        <h2 className="text-xl font-bold text-govGreen-900 border-l-4 border-govSaffron-500 pl-3">
          {t('notif_title')}
        </h2>
        <a href="#" className="text-sm font-semibold text-govGreen-700 hover:underline">{t('view_all')}</a>
      </div>
      
      <div className="bg-white gov-border overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-green-50 text-govGreen-900 uppercase font-bold text-xs border-b-2 border-green-200">
            <tr>
              <th className="px-4 py-3 border-b">{t('sr_no')}</th>
              <th className="px-4 py-3 border-b">{t('title_subject')}</th>
              <th className="px-4 py-3 border-b hidden sm:table-cell">{t('department')}</th>
              <th className="px-4 py-3 border-b">{t('date')}</th>
              <th className="px-4 py-3 border-b text-center">{t('download')}</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif, index) => (
              <tr key={notif.id} className="border-b hover:bg-green-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-start">
                    <FileText size={16} className="mr-2 text-govGreen-600 flex-shrink-0 mt-0.5" />
                    <a href="#" className="hover:text-govGreen-800 hover:underline">{notif.title}</a>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">{notif.dept}</td>
                <td className="px-4 py-3 whitespace-nowrap">{notif.date}</td>
                <td className="px-4 py-3 text-center">
                  <button className="text-red-600 hover:text-red-800 transition-colors" title={t('download')}>
                    <Download size={18} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LatestNotifications;
