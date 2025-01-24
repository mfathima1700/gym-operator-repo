import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

type StatusClasses = {
  [key: string]: string;
};

const statuses: StatusClasses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};

type Client = {
  id: number;
  name: string;
  imageUrl: string;
  lastInvoice: {
    date: string;
    dateTime: string;
    amount: string;
    status: keyof typeof statuses;
  };
};

const clients: Client[] = [
  {
    id: 1,
    name: 'Tuple',
    imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/tuple.svg',
    lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
  },
  {
    id: 2,
    name: 'SavvyCal',
    imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/savvycal.svg',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
  },
  {
    id: 3,
    name: 'Reform',
    imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  },
];

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function MemberCards(): JSX.Element {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {clients.map((client) => (
        <li key={client.id} className="overflow-hidden rounded-xl border border-gray-800">
          <div className="flex items-center gap-x-4 border-b border-gray-800   p-6">
            <img
              alt={client.name}
              src={client.imageUrl}
              className="size-12 flex-none rounded-full bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm/6 font-medium text-white">{client.name}</div>
           
          </div>
          <dl className="-my-3 divide-y divide-gray-800 px-6 py-4 text-sm/6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-white">Role</dt>
              <dd className="text-gray-400">
                <time dateTime={client.lastInvoice.dateTime}>{client.lastInvoice.date}</time>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-white">Created</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-400">{client.lastInvoice.amount}</div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-white">Upcoming Class</dt>
              <dd className="flex items-start gap-x-2">
                <div
                  className={classNames(
                    statuses[client.lastInvoice.status],
                    'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                  )}
                >
                  {client.lastInvoice.status}
                </div>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
