/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getEmployee, getStore } from "@/api/apiCircleK";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface NameStoreProps {
  setInfoStore: any;
}

export function NameStore({ setInfoStore }: NameStoreProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [employee, setEmployee] = React.useState<
    { employeeCode: string; fullName: string }[]
  >([]);
  const [store, setStore] = React.useState<
    { storeCode: string; nameStore: string }[]
  >([]);
  const [date, setDate] = React.useState<Date>();

  const loadNameStore = async () => {
    const dataStore = await getStore();
    setStore(dataStore);
  };
  const getEmployeeByStore = async (value: string) => {
    const dataEmployee: any = await getEmployee(value);
    if (dataEmployee) {
      setEmployee(dataEmployee);
    }
  };
  React.useEffect(() => {
    loadNameStore();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      <div className="space-y-2">
        <Label htmlFor="store">Cửa hàng</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between overflow-hidden"
            >
              {value
                ? store.find(
                    (store: { storeCode: string; nameStore: string }) =>
                      store.storeCode === value
                  )?.nameStore
                : "Select name store..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {store.map(
                    (store: { storeCode: string; nameStore: string }) => (
                      <CommandItem
                        key={store.storeCode}
                        value={store.storeCode}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setInfoStore((prevState: any) => ({
                            ...prevState,
                            storeCode: currentValue,
                            nameStore: store.nameStore,
                          }));
                          getEmployeeByStore(currentValue);
                          setOpen(false);
                        }}
                      >
                        {store.nameStore}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === store.storeCode
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Ngày</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {date ? format(date, "dd/MM/yyyy") : "Chọn ngày"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onDayClick={(e) => {
                setInfoStore((prevState: any) => ({
                  ...prevState,
                  date: e.toString(),
                }));
              }}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employee">Nhân viên</Label>
        <Select
          onValueChange={(e) => {
            setInfoStore((prevState: any) => ({
              ...prevState,
              fullName: e,
            }));
          }}
        >
          <SelectTrigger className="w-full" id="employee">
            <SelectValue placeholder="Chọn nhân viên" />
          </SelectTrigger>
          <SelectContent>
            {employee.length > 0 &&
              employee.map(
                (employee: { employeeCode: string; fullName: string }) => (
                  <SelectItem
                    key={employee.employeeCode}
                    value={employee.fullName}
                  >
                    {employee.fullName}
                  </SelectItem>
                )
              )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
