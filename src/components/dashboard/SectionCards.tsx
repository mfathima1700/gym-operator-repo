import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({members}: {members: any[]}) {
  return (
    <div className="*:data-[slot=card]:shadow-xs grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Monthly Income</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
           £ {25 * members.filter(member => member.isInstructor == false).length}
          </CardTitle>
          <div className="absolute right-4 top-4">
            {/* <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +100%
            </Badge> */}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {
              members.filter(member => member.isInstructor == false).length > 0 ?
              <>
              Trending up this month <TrendingUpIcon className="size-4" /></> : 
               <> No increase this month </>
            }
           
          </div>
          <div className="text-muted-foreground">
           Monthly Revenue for each month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Current Members</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {members.length}
          </CardTitle>
          <div className="absolute right-4 top-4">
            {/* <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +100%
            </Badge> */}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
          {
              members.filter(member => {
                const createdAt = new Date(member.createdAt);
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the current month
              
                return createdAt >= startOfMonth;
              }).length > 0 ?
              <>
              Trending up this month <TrendingUpIcon className="size-4" /></> : 
               <> No increase this month </>
            }
          </div>
          <div className="text-muted-foreground">
            Membership over the last month
          </div>
        </CardFooter>
      </Card>
      
    </div>
  )
}
