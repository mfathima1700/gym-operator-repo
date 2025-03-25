import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";


type Person = {
    name: string;
    email: string;
    imageUrl: string;
    href: string;
  };
  
  const people: Person[] = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
  ];
  
  export default function OldGoalsList(): JSX.Element {
    return (
      <div>
        <ul role="list" >
          {people.map((person) => (
            <li key={person.email} className=" gap-x-4 py-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle>{person.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <Label className="min-h-[120px] font-normal text-gray-500">
             Completed on: 
              </Label>
            </CardContent>
          </Card>
        </li>


            
            
          ))}
        </ul>
        {/* <a
          href="#"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          View all
        </a> */}
      </div>
    );
}
  