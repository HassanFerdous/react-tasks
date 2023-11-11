"use client";

import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowLeft,
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	Maximize2,
	MoreVertical,
	PencilLine,
	ScanEye,
	Search,
	Trash,
	User2,
	UserCircle2,
} from "lucide-react";
import {SelectItem, SelectLabel, SelectValue} from "@/components/ui/select";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import CustomSelect from "./ui/custom-select";
import UserIcon from "@/assets/user-id.svg";
import {Calendar} from "@/components/ui/calendar";
import {Label} from "./ui/label";
import filter from "@/assets/tuning.svg";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export type Schedule = {
	id: string;
	account_name: string;
	patient_name: string;
	driver: "John Smith" | "John Doe";
	status: "upcoming" | "in progress" | "completed" | "canceled" | "scheduled";
	pick_address: string;
	drop_address: string;
	pickup_time: string;
	appointment_time: string;
	drop_time: string;
	miles: number;
	vehicle_type: string;
};

//dummy data
const data: Schedule[] = [
	{
		id: "1",
		account_name: "Colorado Department of Health Care Policy...",
		patient_name: "John Smith",
		driver: "John Smith",
		status: "upcoming",
		pick_address: "781 Hilll Junctions Apt. 411",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
	{
		id: "2",
		account_name: "Colorado Department of Health Care Policy...",
		patient_name: "John Smith",
		driver: "John Smith",
		status: "completed",
		pick_address: "781 Hilll Junctions Apt. 411",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
	{
		id: "3",
		account_name: "account 1",
		patient_name: "John Smith",
		driver: "John Doe",
		status: "canceled",
		pick_address: "781 Hilll Junctions Apt. 411",
		drop_address: "Bagerhata",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
	{
		id: "4",
		account_name: "account 2",
		patient_name: "John Smith",
		driver: "John Smith",
		status: "scheduled",
		pick_address: "781 Hilll Junctions Apt. 411",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
	{
		id: "5",
		account_name: "Colorado Department of Health Care Policy...",
		patient_name: "John Smith",
		driver: "John Smith",
		status: "upcoming",
		pick_address: "Jamalpur",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
	{
		id: "6",
		account_name: "Colorado Department of Health Care Policy...",
		patient_name: "John Smith",
		driver: "John Doe",
		status: "in progress",
		pick_address: "781 Hilll Junctions Apt. 411",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
	{
		id: "7",
		account_name: "Colorado Department of Health Care Policy...",
		patient_name: "John Smith",
		driver: "John Smith",
		status: "upcoming",
		pick_address: "Jamalpur",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
	{
		id: "8",
		account_name: "Colorado Department of Health Care Policy...",
		patient_name: "John Smith",
		driver: "John Doe",
		status: "in progress",
		pick_address: "781 Hilll Junctions Apt. 411",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
];

// select row color by status
const selectColor = (status: string) => {
	const $lowerStatus = status.toLocaleLowerCase();
	if ($lowerStatus === "completed") {
		return {
			text: "text-[#547544]",
			bg: "bg-[#F5FFF1]",
			statusBg: "bg-[#DEFFCF]",
		};
	} else if ($lowerStatus === "in progress") {
		return {
			text: "text-[#825D30]",
			bg: "bg-[#FEF6EC]",
			statusBg: "bg-[#FFE6C8]",
		};
	} else if ($lowerStatus === "canceled") {
		return {
			text: "text-[#843838]",
			bg: "bg-[#FFF2F2]",
			statusBg: "bg-[#FFDADA]",
		};
	} else if ($lowerStatus === "upcoming") {
		return {
			text: "text-[#726D41]",
			bg: "bg-[#FFFEF3]",
			statusBg: "bg-[#FFFACC]",
		};
	} else {
		return {
			text: "text-[#7F8596]",
			bg: "bg-[#fff]",
			statusBg: "bg-[#FCFCFC]",
		};
	}
};

export const columns: ColumnDef<Schedule>[] = [
	{
		id: "select",
		header: ({table}) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({row}) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "account_name",
		header: "Account Name",
		cell: ({row}) => <div className="capitalize min-w-[158px]">{row.getValue("account_name")}</div>,
	},
	{
		accessorKey: "patient_name",
		header: "Patient name",
		cell: ({row}) => <div className="capitalize whitespace-nowrap">{row.getValue("patient_name")}</div>,
	},
	{
		accessorKey: "driver",
		header: "Driver",
		cell: ({row}) => (
			<div className="capitalize whitespace-nowrap">
				<CustomSelect
					placeholder="Client"
					defaultValue={row.getValue("driver")}
					className="px-2"
					trigger={(value, placeholder) => (
						<SelectValue className="text-sm font-medium px-2" placeholder={placeholder} aria-label={value}>
							<span className="text-[#4387F7] bg-[#F1FAFD] rounded w-6 h-5 inline-block mr-2">
								{value
									.split(" ")
									.slice(0, 2)
									.map((l) => l[0])}
							</span>
							{value}
						</SelectValue>
					)}>
					<SelectItem value="John Smith">John Smith</SelectItem>
					<SelectItem value="John Doe">John Doe</SelectItem>
				</CustomSelect>
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		enableColumnFilter: true,
		filterFn: (row, columnId, filterStatuses) => {
			if (filterStatuses.length === 0) return true;
			const status = row.getValue(columnId);
			return filterStatuses.includes(status);
		},
		cell: ({row}) => {
			const {text, statusBg} = selectColor(row.getValue("status")) as {
				text: string;
				statusBg: string;
			};
			return (
				<div className="capitalize">
					<div
						className={cn(
							"px-2 py-1 relative rounded-md border-[0.5px] text-xs capitalize border-current flex items-center justify-center whitespace-nowrap",
							text,
							statusBg
						)}>
						<span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-2 opacity-60"></span>
						{row.getValue("status")}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "pick_address",
		header: "Pick address",
		cell: ({row}) => <div className="capitalize whitespace-nowrap">{row.getValue("pick_address")}</div>,
	},
	{
		accessorKey: "drop_address",
		header: "Drop address",
		cell: ({row}) => <div className="capitalize whitespace-nowrap">{row.getValue("drop_address")}</div>,
	},
	{
		accessorKey: "pickup_time",
		header: "pickup time",
		cell: ({row}) => <div className="capitalize">{row.getValue("pickup_time")}</div>,
	},
	{
		accessorKey: "appointment_time",
		header: "Appointment Time",
		cell: ({row}) => <div className="capitalize">{row.getValue("appointment_time")}</div>,
	},
	{
		accessorKey: "drop_time",
		header: "Drop time",
		cell: ({row}) => <div className="capitalize">{row.getValue("drop_time")}</div>,
	},
	{
		accessorKey: "miles",
		header: "miles",
		cell: ({row}) => <div className="capitalize">{row.getValue("miles")}</div>,
	},
	{
		accessorKey: "vehicle_type",
		header: "Vehicle type",
		cell: ({row}) => <div className="capitalize">{row.getValue("vehicle_type")}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({row}) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className={cn("h-5 w-5 p-0 translate-x-2", selectColor(row.getValue("status"))["bg"])}>
							<span className="sr-only">Open menu</span>
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="min-w-[220px]" align="end">
						<DropdownMenuItem>
							<ScanEye className="mr-3 w-4 h-4" />
							View
						</DropdownMenuItem>
						<DropdownMenuItem>
							<PencilLine className="mr-3 w-4 h-4" /> Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Trash className="mr-3 w-4 h-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export function TripsTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
		{id: "status", value: ["completed", "in progress", "canceled", "upcoming"]},
	]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [globalFilter, setGlobalFilter] = React.useState("");
	const [rowSelection, setRowSelection] = React.useState({});
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	const table = useReactTable({
		initialState: {
			pagination: {
				pageSize: 6,
			},
		},
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
	});
	const {pageIndex, pageSize} = table.getState().pagination;
	const drivers = [...new Set(data.map((item) => item.driver))];

	// filter by column
	const filterByColumn = (id: string, value: string) => {
		setColumnFilters((columns) => {
			const column = columns.findIndex((column) => column?.id === id);
			if (column !== -1) {
				columns[column].value = value;
				return [...columns];
			} else {
				return [...columns, {id, value}];
			}
		});
	};

	//filter by status
	const handleStatusChange = (checked: boolean, value: string) => {
		let statuses = (columnFilters.find((f) => f?.id === "status")?.value as string[]) || [];
		if (checked) {
			statuses?.push(value);
		} else {
			statuses = statuses?.filter((f) => f !== value);
		}
		setColumnFilters((prev) => {
			return prev.filter((f) => f.id !== "status").concat([{id: "status", value: statuses}]);
		});
	};

	return (
		<div className="lg:grid grid-cols-[284px_calc(100%_-_284px)]">
			{/* Sidebar */}
			<aside className="border-r border-[#E6EBF3]">
				<div className="min-h-[92px] border-b border-[#E6EBF3] px-8 py-6">
					<h2 className="text-2xl font-medium">Calendar</h2>
				</div>
				<div className="py-8 px-6">
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						className="rounded-md border max-lg:max-w-[350px] mx-auto"
						classNames={{
							month: "w-full",
							table: "mt-6 w-full",
							head_row: "hidden",
							row: "flex space-x-1 justify-between [&:not(:last-child)]:mb-4",
							cell: "[&:has([aria-selected])]:bg-transparent",
							day: "w-6 h-6 relative",
							day_today:
								'after:absolute after:top-1/2 after:left-1/2 after:w-8 after:h-8 after:content-[""] after:border after:border-blue-500 after:rounded-full after:-translate-x-1/2  after:-translate-y-1/2',
							day_selected:
								'bg-transparent after:absolute after:top-1/2 after:left-1/2 after:w-8 after:h-8 after:content-[""] after:border after:border-blue-500 after:rounded-full after:-translate-x-1/2  after:-translate-y-1/2 after:bg-blue-500 text-white after:-z-[1]',
							nav_button_previous: "relative text-black opacity-100",
							nav_button_next: "relative text-black opacity-100",
							caption: "flex items-center justify-between space-x-3",
						}}
						components={{
							IconLeft: () => <ArrowLeft className="w-4 h-5" />,
							IconRight: () => <ArrowRight className="w-4 h-5" />,
						}}
					/>
					<div className="py-6 border-t border-[#E6EBF3] mt-8">
						<div className="relative">
							<Label className="absolute left-4 top-1/2 -translate-y-1/2" htmlFor="search_trip">
								<Search className="w-5 h-5 text-[#7F8596]" />
							</Label>
							<Input
								placeholder="Search trip..."
								id="search_trip"
								// onChange={(event) => setGlobalFilter(event.target.value)}
								className="w-full lg:max-w-[280px] px-11 bg-[#F9FBFF]"
							/>
						</div>
					</div>
					<div>
						<Accordion defaultValue={["item-1"]} type="multiple">
							<AccordionItem className="border-0" value="item-1">
								<AccordionTrigger className="font-medium hover:no-underline">Trip Status</AccordionTrigger>
								<AccordionContent>
									<div className="space-y-4 py-3">
										<div className="flex items-center space-x-2">
											<Checkbox
												className="text-xl h-4 w-4 accent-blue-500"
												id="complete"
												value="complete"
												defaultChecked
												onCheckedChange={(checked: boolean) => handleStatusChange(checked, "completed")}
											/>
											<Label
												htmlFor="complete"
												className="px-2 py-1 h-7 relative rounded-md border-[0.5px] text-xs capitalize border-current flex items-center justify-center whitespace-nowrap text-[#547544] bg-[#DEFFCF]">
												<span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-2 opacity-60"></span>
												completed
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												className="text-xl h-4 w-4"
												id="upcoming"
												value="upcoming"
												defaultChecked
												onCheckedChange={(checked: boolean) => handleStatusChange(checked, "upcoming")}
											/>
											<Label
												htmlFor="upcoming"
												className="px-2 py-1 h-7 relative rounded-md border-[0.5px] text-xs capitalize border-current flex items-center justify-center whitespace-nowrap text-[#726D41] bg-[#FFFACC]">
												<span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-2 opacity-60"></span>
												upcoming
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												className="text-xl h-4 w-4"
												id="in_progress"
												value="in progress"
												defaultChecked
												onCheckedChange={(checked: boolean) => handleStatusChange(checked, "in progress")}
											/>

											<Label
												htmlFor="in_progress"
												className="px-2 py-1 h-7 relative rounded-md border-[0.5px] text-xs capitalize border-current flex items-center justify-center whitespace-nowrap text-[#825D30] bg-[#FFE6C8]">
												<span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-2 opacity-60"></span>
												In progress
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												className="text-xl h-4 w-4"
												id="canceled"
												value="canceled"
												defaultChecked
												onCheckedChange={(checked: boolean) => handleStatusChange(checked, "canceled")}
											/>
											<Label
												htmlFor="canceled"
												className="px-2 py-1 h-7 relative rounded-md border-[0.5px] text-xs capitalize border-current flex items-center justify-center whitespace-nowrap text-[#843838] bg-[#FFDADA]">
												<span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-2 opacity-60"></span>
												Canceled
											</Label>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem className="border-0" value="item-2">
								<AccordionTrigger className="font-medium hover:no-underline">Accounts</AccordionTrigger>
								<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</aside>

			{/* Content */}
			<div className="trip-content">
				<div className="py-5 px-6 lg:px-8 border-b border-[#E6EBF3] min-h-[92px] flex items-center justify-between space-x-3 md:space-x-6">
					<div className="relative">
						<Label className="absolute left-4 top-1/2 -translate-y-1/2" htmlFor="search">
							<Search className="w-5 h-5 text-[#7F8596]" />
						</Label>
						<Input
							placeholder="Search"
							id="search"
							onChange={(event) => setGlobalFilter(event.target.value)}
							className="w-full lg:max-w-[280px] px-11"
						/>
					</div>
					<div className="flex items-center space-x-3 md:space-x-4">
						<Button className="h-11" variant="outline">
							<img className="w-5 h-5 mr-2 inline-block" src={filter} alt="" />
							Filter
						</Button>
						<Button className="h-11 w-11 p-0" variant="outline">
							<Maximize2 className="w-5 h-5" />
						</Button>
					</div>
				</div>
				<div className="px-6 md:px-8">
					<div className="lg:flex items-center py-4 flex-wrap">
						<div className="flex items-center">
							<Button className="w-8 h-8" size="icon" variant="outline">
								<ArrowLeft className="w-5 h-5" />
							</Button>
							<div className="ml-3 text-[#7F8596] font-medium text-base xl:text-xl">
								<span className="text-black">Trips: </span>16 Oct, 2023
							</div>
						</div>
						<div className="flex items-center flex-wrap sm:space-x-2 max-sm:space-y-2 md:space-x-4 justify-end flex-1 mt-5 lg:mt-0">
							<CustomSelect
								className="min-w-[149px] max-sm:w-full"
								placeholder="Client"
								icon={<User2 className="mr-2 w-5 h-5" />}>
								<SelectItem value="client-1">Client-1</SelectItem>
								<SelectItem value="client-2">Client-2</SelectItem>
							</CustomSelect>
							<CustomSelect
								className="min-w-[149px] max-sm:w-full"
								placeholder="Driver"
								onChange={(value) => filterByColumn("driver", value)}
								icon={<img className="mr-2 w-5 h-5" src={UserIcon} alt="client" />}>
								<SelectLabel>Drivers</SelectLabel>
								{drivers.map((driver, i) => (
									<SelectItem key={i} value={driver}>
										{driver}
									</SelectItem>
								))}
							</CustomSelect>
							<CustomSelect
								className="min-w-[149px] max-sm:w-full"
								placeholder="Account"
								onChange={(value) => filterByColumn("account_name", value)}
								icon={<UserCircle2 className="mr-2 w-5 h-5" />}>
								<SelectItem value="account 1">Account 1</SelectItem>
								<SelectItem value="account 2">Account 2</SelectItem>
							</CustomSelect>
						</div>
					</div>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead className="uppercase whitespace-nowrap" key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => {
										return (
											<TableRow
												className={cn(selectColor(row.getValue("status"))?.bg)}
												key={row.id}
												data-state={row.getIsSelected() && "selected"}>
												{row.getVisibleCells().map((cell) => (
													<TableCell
														className={cell.getContext().column.id === "actions" ? "sticky right-0" : ""}
														key={cell.id}>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</TableCell>
												))}
											</TableRow>
										);
									})
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center">
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<div className="flex items-center justify-between space-x-2 py-4">
						<div className="flex items-center space-x-2">
							<div className="space-x-2 flex items-center">
								<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
									<ChevronLeft className="max-md:w-4 max-md:h-4" />
								</button>
								<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
									<ChevronRight className="max-md:w-4 max-md:h-4" />
								</button>
							</div>
							<div className="flex-1 text-sm text-muted-foreground max-md:text-xs">
								{pageIndex * pageSize + 1}-
								{data.length <= (pageIndex + 1) * pageSize ? data.length : (pageIndex + 1) * pageSize} of{" "}
								{data.length} results
							</div>
						</div>
						<div className="text-[#8A8F96] max-md:text-xs">
							Rows per page
							<select
								className="ml-2 bg-transparent font-medium text-black"
								value={pageSize}
								onChange={(e) => {
									table.setPageSize(Number(e.target.value));
								}}>
								{[6, 10, 20, 30].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
