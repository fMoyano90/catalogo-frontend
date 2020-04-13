import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  public userRole: string;
  constructor(private storage: Storage) {
    this.obtenerRole();
  }

  obtenerRole() {
    this.storage.get("userRole").then((resp) => {
      this.userRole = resp;
    });
  }
}
