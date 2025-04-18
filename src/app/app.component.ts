import { Component, inject } from "@angular/core";
import {
	collection,
	collectionData,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	type CollectionReference,
} from "@angular/fire/firestore";
import { Firestore } from "@angular/fire/firestore";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import type { Gift } from "./models/gift.model";
import { TruncatePipe } from "./pipes/truncate.pipe";
import { environment } from "./environments/environment";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [CommonModule, FormsModule, TruncatePipe],
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	private firestore: Firestore = inject(Firestore);
	gifts: Gift[] = [];
	gift = { name: "", link: "", price: undefined };
	canEdit = false;
	editCode = "";
	tempBuyerNames: { [id: string]: string } = {};

	constructor() {
		const giftCollection = collection(
			this.firestore,
			"gifts",
		) as CollectionReference<Gift>;
		collectionData<Gift>(giftCollection, { idField: "id" }).subscribe(
			(response) => {
				this.gifts = response;
			},
		);
	}

	buyGift(id: string, buyerName: string) {
		const giftRef = doc(this.firestore, `gifts/${id}`);
		return updateDoc(giftRef, { buyerName });
	}

	addGift(gift: {
		name: string;
		link: string;
		price?: number;
	}): Promise<void> | void {
		if (gift.name && gift.link && gift.price) {
			const newGift = { name: gift.name, link: gift.link, price: gift.price };
			const giftCollection = collection(this.firestore, "gifts");
			return addDoc(giftCollection, newGift).then(() => {
				this.gift.name = "";
				this.gift.link = "";
				this.gift.price = undefined;
			});
		}
	}

	deleteGift(id: string) {
		const giftRef = doc(this.firestore, `gifts/${id}`);
		return deleteDoc(giftRef);
	}

	checkCode() {
		this.canEdit = this.editCode === environment.editCode;
	}
}
