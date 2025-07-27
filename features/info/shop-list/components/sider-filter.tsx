"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function SidebarFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="地區" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="taipei">台北市</SelectItem>
            <SelectItem value="newtaipei">新北市</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="價格" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-500">NT$ 0-500</SelectItem>
            <SelectItem value="501-1000">NT$ 501-1000</SelectItem>
            <SelectItem value="1001+">NT$ 1001+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Input type="search" placeholder="請輸入地區、店家名稱或關鍵字" className="flex-1" />
        <Button size="icon" variant="secondary">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}