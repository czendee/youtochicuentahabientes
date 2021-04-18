import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnDestroy,
  OnChanges
} from "@angular/core";
import { Resource } from "../model/resource/resource";
import { MainService } from "../main.service";
import { ActivatedRoute } from "@angular/router";
import { Production } from "../model/production";
import { ProductionSorter } from "../model/utility/productionSorter";
import { TotalProductionSorter } from "../model/utility/totalProductionSorter";
import { Subscription } from "rxjs";
import { RestApiService } from "../rest-api.service";
import { Employee } from "../employee";

@Component({
  selector: "app-production-tables",
  templateUrl: "./production-tables.component.html",
  styleUrls: ["./production-tables.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionTablesComponent
  implements OnInit, OnDestroy, OnInit, OnChanges {
  private subscriptions: Subscription[] = [];
  activeProduct = new Array<Production>();
  activeProducer = new Array<Production>();
  prodSorter = new ProductionSorter();
  totalProdSorter = new TotalProductionSorter();
    
  Employee: any = [];
    
  @Input() unit: Resource;

  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public restApi: RestApiService
  ) {}

  ngOnInit() {
    this.loadEmployees();
    
    this.subscriptions.push(
      this.ms.em.updateEmitter.subscribe(() => {
        this.cd.markForCheck();
      })
    );
  }
    
  // Get employees list
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    })
  }
    
  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  ngOnChanges() {
    this.getUnit();
  }
  getUnit() {
    if (this.unit instanceof Resource) {
      this.activeProduct = this.unit.products.filter(p => p.product.unlocked);
      this.activeProducer = this.unit.generators.filter(
        p => p.producer.unlocked
      );

      this.cd.markForCheck();
    }
  }
}
