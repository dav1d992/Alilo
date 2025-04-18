import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
	name: "truncate",
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, limit = 30): string {
		if (value.length > limit) {
			return `${value.substring(0, limit)}...`;
		}
		return value;
	}
}
