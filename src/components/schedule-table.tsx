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
import {ChevronDown, MoreHorizontal} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {cn} from "@/lib/utils";

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
		account_name: "Colorado Department of Health Care Policy...",
		patient_name: "John Smith",
		driver: "John Smith",
		status: "canceled",
		pick_address: "781 Hilll Junctions Apt. 411",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
	{
		id: "4",
		account_name: "Colorado Department of Health Care Policy...",
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
		pick_address: "781 Hilll Junctions Apt. 411",
		drop_address: "781 Hilll Junctions Apt. 411",
		pickup_time: "04:00 PM",
		appointment_time: "05:30 PM",
		drop_time: "08:12 PM",
		miles: 84.15,
		vehicle_type: "Van",
	},
];

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

export const columns: ColumnDef<Schedule>[] = [
	{
		id: "select",
		header: ({table}) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
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
		cell: ({row}) => (
			<div className="capitalize min-w-[158px]">
				{row.getValue("account_name")}
			</div>
		),
	},
	{
		accessorKey: "patient_name",
		header: "Patient name",
		cell: ({row}) => (
			<div className="capitalize whitespace-nowrap">
				{row.getValue("patient_name")}
			</div>
		),
	},
	{
		accessorKey: "driver",
		header: "Driver",
		cell: ({row}) => (
			<div className="capitalize whitespace-nowrap">
				<Select defaultValue={row.getValue("driver")}>
					<SelectTrigger className="w-[183px]">
						<SelectValue placeholder="Select Driver" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="John Smith">John Smith</SelectItem>
							<SelectItem value="John Doe">John Doe</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({row}) => {
			const {text, statusBg} = selectColor(row.getValue("status")) as {text: string, statusBg: string};
			return (
				<div className="capitalize">
					{/* <Select defaultValue={row.getValue("status")}>
				<SelectTrigger className="w-[99px]">
					<SelectValue placeholder="Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="pending" className="capitalize">pending</SelectItem>
						<SelectItem value="in progress" className="capitalize">in progress</SelectItem>
						<SelectItem value="completed" className="capitalize">completed</SelectItem>
						<SelectItem value="scheduled" className="capitalize">scheduled</SelectItem>
						<SelectItem value="Canceled" className="capitalize">Canceled</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select> */}
					<div
						className={cn(
							"px-2 py-1 relative rounded-md border-[0.5px] text-xs capitalize border-current flex items-center justify-center",
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
		cell: ({row}) => (
			<div className="capitalize whitespace-nowrap">
				{row.getValue("pick_address")}
			</div>
		),
	},
	{
		accessorKey: "drop_address",
		header: "Drop address",
		cell: ({row}) => (
			<div className="capitalize whitespace-nowrap">
				{row.getValue("drop_address")}
			</div>
		),
	},
	{
		accessorKey: "pickup_time",
		header: "pickup time",
		cell: ({row}) => (
			<div className="capitalize">{row.getValue("pickup_time")}</div>
		),
	},
	{
		accessorKey: "appointment_time",
		header: "Appointment Time",
		cell: ({row}) => (
			<div className="capitalize">{row.getValue("appointment_time")}</div>
		),
	},
	{
		accessorKey: "drop_time",
		header: "Drop time",
		cell: ({row}) => (
			<div className="capitalize">{row.getValue("drop_time")}</div>
		),
	},
	{
		accessorKey: "miles",
		header: "miles",
		cell: ({row}) => (
			<div className="capitalize">{row.getValue("miles")}</div>
		),
	},
	{
		accessorKey: "vehicle_type",
		header: "Vehicle type",
		cell: ({row}) => (
			<div className="capitalize">{row.getValue("vehicle_type")}</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({row}) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export function CalenderPageTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
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
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter emails..."
					// value={
					// 	(table.getColumn("email")?.getFilterValue() as string) ?? ""
					// }
					// onChange={(event) =>
					// 	table.getColumn("email")?.setFilterValue(event.target.value)
					// }
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className="uppercase whitespace-nowrap"
											key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
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
										className={cn(
											selectColor(row.getValue("status"))?.bg
										)}
										key={row.id}
										data-state={row.getIsSelected() && "selected"}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
