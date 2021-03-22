import {
  OnInit,
  HostBinding,
  AfterViewInit,
  Component,
  ChangeDetectionStrategy
} from "@angular/core";
import { MainService } from "../main.service";
import { Enemy } from "../model/enemy/enemy";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { OptionsService } from "../options.service";
import { RestApiService } from "/shared/rest-api.service";
import { Employee } from "/shared/employee";

declare let preventScroll;
@Component({
  selector: "app-enemies",
  templateUrl: "./enemies.component.html",
  styleUrls: ["./enemies.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnemiesComponent implements OnInit, AfterViewInit {
  
  Employee: any = [];
  
  @HostBinding("class")
  contentContainer = "content-container";

  constructor(public ms: MainService, public os: OptionsService, public restApi: RestApiService) {}

  ngOnInit() {
    this.loadEmployees()
  }

  // Get employees list
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    })
  }
  
  getEnemyId(index: number, enemy: Enemy) {
    return enemy.id;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.ms.game.enemyManager.allEnemy,
      event.previousIndex,
      event.currentIndex
    );
  }
  ngAfterViewInit(): void {
    if (typeof preventScroll === typeof Function) preventScroll();
  }
}
