"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

export default function SchedulingPage() {
  const [bookName, setBookName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState("");
  const [scheduleItems, setScheduleItems] = useState<
    {
      bookName: string;
      startDate: Date | undefined;
      endDate: Date | undefined;
      priority: string;
      completed: boolean;
    }[]
  >([]);

  const handleAddItem = () => {
    setScheduleItems([
      ...scheduleItems,
      {
        bookName,
        startDate,
        endDate,
        priority,
        completed: false,
      },
    ]);
    setBookName("");
    setStartDate(undefined);
    setEndDate(undefined);
    setPriority("");
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...scheduleItems];
    newItems.splice(index, 1);
    setScheduleItems(newItems);
  };

  const handleToggleComplete = (index: number) => {
    const newItems = [...scheduleItems];
    newItems[index].completed = !newItems[index].completed;
    setScheduleItems(newItems);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Book Scheduling</h1>
      <p className="text-muted-foreground">Plan your reading schedule.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bookName">Book Name</Label>
          <Input
            type="text"
            id="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div>
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) =>
                  date > (endDate ? endDate : new Date("2100-01-01"))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) =>
                  date < (startDate ? startDate : new Date("1900-01-01"))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select onValueChange={(value) => setPriority(value)}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleAddItem}>Add Item</Button>

      {scheduleItems.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Schedule:</h2>
          <ul>
            {scheduleItems.map((item, index) => (
              <li key={index} className="py-2 flex items-center justify-between">
                <div>
                  <span className="font-medium">{item.bookName}</span> (
                  {item.priority} Priority) -{" "}
                  {item.startDate && format(item.startDate, "PPP")} to{" "}
                  {item.endDate && format(item.endDate, "PPP")}
                  <button
                    onClick={() => handleToggleComplete(index)}
                    className="ml-2 text-sm text-blue-500"
                  >
                    {item.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
