import { bootstrapApplication } from "@angular/platform-browser";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { provideDatabase, getDatabase } from "@angular/fire/database";
import { AppComponent } from "./app/app.component";
import { environment } from "./app/environments/environment";

bootstrapApplication(AppComponent, {
	providers: [
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),
		provideDatabase(() => getDatabase()),
	],
});
