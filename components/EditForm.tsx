'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export default function EditForm() {
    return (
      <div className="p-6 min-h-full">
    <div className="flex items-center justify-between">

        {/* หัวข้อ */}
        <h2 className="text-2xl font-bold text-black">
            รายงาน
        </h2>

        {/* ช่วงเวลา + ปุ่ม */}
        <div className="flex items-center gap-6"> {/* เพิ่ม gap จาก 3 เป็น 6 หรือ 8 */}
            
            <Select defaultValue="6months">
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="เลือกช่วงเวลา" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1month">1 เดือนที่แล้ว</SelectItem>
                    <SelectItem value="3months">3 เดือนที่แล้ว</SelectItem>
                    <SelectItem value="6months">6 เดือนที่แล้ว</SelectItem>
                    <SelectItem value="1year">1 ปีที่แล้ว</SelectItem>
                </SelectContent>
            </Select>

            <Button className="px-6 py-2">
                <Download className="mr-2 h-4 w-4" />
                Export
            </Button>

        </div>
    </div>
</div>

    )
}
