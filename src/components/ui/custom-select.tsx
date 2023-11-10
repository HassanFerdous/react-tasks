import {
	Select,
	SelectContent,
	SelectGroup,
	SelectValue,
} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {ReactElement, useState} from "react";
import {Button} from "./button";

import * as SelectPrimitive from "@radix-ui/react-select";
import {ChevronDown} from "lucide-react";

interface CustomSelect {
	defaultValue?: string;
	placeholder: string;
	className?: string;
	icon?: ReactElement;
	children: React.ReactNode;
	trigger?: (value: string, placeholder: string) => React.ReactElement
}

export default function CustomSelect({
	defaultValue,
	placeholder,
	trigger,
	className,
	children,
	icon,
}: CustomSelect) {
	const [value, setValue] = useState<string>(defaultValue || '');
	return (
		<Select defaultValue={value} onValueChange={setValue}>
			<SelectPrimitive.Trigger className={cn('w-[180px]', className)} asChild>
				<Button
					className="justify-between"
					variant="outline"
					aria-label="driver">
					<div className="flex items-center">
						{icon && icon}
						{trigger ? trigger(value, placeholder): <SelectValue
							className="text-sm font-medium"
							placeholder={placeholder}
							aria-label={value}>
							{value}
						</SelectValue>}
					</div>
					<SelectPrimitive.Icon asChild>
						<ChevronDown className="h-5 w-5 opacity-50" />
					</SelectPrimitive.Icon>
				</Button>
			</SelectPrimitive.Trigger>
			<SelectContent>
				<SelectGroup>{children}</SelectGroup>
			</SelectContent>
		</Select>
	);
}
