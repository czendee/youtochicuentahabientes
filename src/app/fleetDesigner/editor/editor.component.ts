import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from "@angular/core";
import { ShipDesign } from "src/app/model/fleet/shipDesign";
import { Module, Sizes, getSizeName } from "src/app/model/fleet/module";
import { MainService } from "src/app/main.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DesignLine } from "src/app/model/fleet/designLine";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnChanges {
  @Input() design: ShipDesign;

  getSizeName = getSizeName;
  deleteModal = false;
  changed = false;
  canUpgrade = false;
  upgradeMessage = "";
  private subscriptions: Subscription[] = [];

  constructor(
    public ms: MainService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.design) this.design.copy();
    if (this.design.modules.length === 0) {
      this.edit();
    }
  }
  ngOnInit() {
    if (this.design.modules.length === 0) {
      this.edit();
    }
    this.reloadCanBuy();
    this.subscriptions.push(
      this.ms.em.updateEmitter.subscribe(() => {
        this.reloadCanBuy();
        this.cd.markForCheck();
      })
    );
  }

  addModule() {
    this.design.addModule();
    this.reload();
  }
  removeModule(i: number) {
    this.design.removeModule(i);
    this.reload();
  }
  reload() {
    this.design.editable.modules.forEach(w => {
      w.module = this.ms.game.fleetManager.unlockedModules.find(
        q => q.id === w.moduleId
      );

      w.setMaxLevel();
      w.level = Math.max(Math.min(w.levelUi, w.maxLevel), 1);
    });

    this.design.editable.reload();
    this.design.editable.isValid =
      this.design.editable.isValid &&
      this.design.editable.modules.findIndex(m => this.validateLevel(m)) === -1;
    this.reloadCanBuy();
    this.ms.em.designEmitter.emit(1);
  }
  reloadCanBuy() {
    if (!this.design || !this.design.editable) return false;

    this.canUpgrade = this.ms.game.resourceManager.alloy.quantity.gte(
      this.design.editable.upgradePrice
    );
    this.upgradeMessage = this.canUpgrade
      ? "Upgrade will cost"
      : "Cannot upgrade! Need ";
  }
  deleteDesign() {
    this.ms.game.fleetManager.deleteDesign(this.design);
    this.router.navigate(["/fleet/design"]);
  }
  getModuleId(index: number, module: Module) {
    return module.id + " " + index;
  }
  getSizeId(index: number, size: Sizes) {
    return size;
  }
  save() {
    // if (!this.canUpgrade) return false;

    this.design.saveConfig();
    this.ms.em.designEmitter.emit(5);
    this.cd.markForCheck();
  }
  revert() {
    if (this.design) this.design.copy();
    this.reload();
  }
  edit() {
    if (this.design) this.design.copy();
  }
  maxAll() {
    this.design.maxAll();
    this.reload();
  }
  validateLevel(w: DesignLine) {
    return !(w.levelUi >= 10 && w.levelUi <= w.maxLevel);
  }
}
