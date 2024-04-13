import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      {
        path: 'actual-production-and-designed-capacity/:id/:periodid',
        loadChildren: () =>
          import('../modules/actual-production-and-designed-capacity/actual-production-and-designed-capacity.module').then((m) => m.ActualProductionAndDesignedCapacityModule)
      },
      {
        path: 'actual-raw-materials/:id/:periodid',
        loadChildren: () =>
          import('../modules/actual-raw-materials/actual-raw-materials.module').then((m) => m.ActualRawMaterialsModule)
      },
      {
        path: 'basic-info/:id/:periodid',
        loadChildren: () =>
          import('../modules/basic-info/basic-info.module').then((m) => m.BasicInfoModule)
      },

      {
        path: 'customs-items-update/:id/:periodid',
        loadChildren: () =>
          import('../modules/customs-items-update/customs-items-update.module').then((m) => m.CustomsItemsUpdateModule)
      },
     
      {
        path: 'factories-list',
        loadChildren: () =>
          import('../modules/factory/factory.module').then((m) => m.FactoryModule)
      },
      {
        path: 'factory-contacts/:id/:periodid',
        loadChildren: () =>
          import('../modules/factory-contacts/factory-contacts.module').then((m) => m.FactoryContactsModule)
      },
      {
        path: 'factory-landing/:id/:periodid',
        loadChildren: () =>
          import('../modules/factory-landing/factory-landing.module').then((m) => m.FactoryLandingModule)
      },
      {
        path: 'factory-location/:id/:periodid',
        loadChildren: () =>
          import('../modules/factory-location/factory-location.module').then((m) => m.FactoryLocationModule)
      },
      {
        path: 'factory-products/:id/:periodid',
        loadChildren: () =>
          import('../modules/factory-products/factory-products.module').then((m) => m.FactoryProductsModule)
      },
      {
        path: 'factory-raw-materials/:id/:periodid',
        loadChildren: () =>
          import('../modules/factory-raw-materials/factory-raw-materials.module').then((m) => m.FactoryRawMaterialsModule)
      },
      {
        path: 'financial-details/:id/:periodid',
        loadChildren: () =>
          import('../modules/financial-details/financial-details.module').then((m) => m.FinancialDetailsModule)
      },
      {
        path: 'monthlyfinancial/:id/:periodid',
        loadChildren: () =>
          import('../modules/monthly-financial/monthly-financial.module').then((m) => m.MonthlyFinancialModule)
      },

      {
        path: 'period/:id',
        loadChildren: () =>
          import('../modules/period/period.module').then((m) => m.PeriodModule)
      },
      {
        path: 'Admin/inspectors-list',
        loadChildren: () =>
          import('../modules/Admin/admin/inspector-lists/inspector-lists/inspector-lists.module').then((m) => m.InspectorListsModule)
      },
      {
        path: 'Inspector/visit-landing/:id/:periodid',
        loadChildren: () =>
          import('../modules/inspector/visit-landing/visit-landing.module').then((m) => m.VisitLandingModule)
      },
      {
        path: 'Inspector/basic-info/:id/:periodid',
        loadChildren: () =>
          import('../modules/inspector/basic-info/basic-info.module').then((m) => m.BasicInfoModule)
      },
      {
        path: 'Inspector/actual-production-and-designed-capacity/:id/:periodid',
        loadChildren: () =>
          import('../modules/inspector/actual-production-and-designed-capacity/actual-production-and-designed-capacity.module').then((m) => m.ActualProductionAndDesignedCapacityModule)
      },
      {
        path: 'Inspector/factories-list',
        loadChildren: () =>
          import('../modules/inspector/factories-list/factories-list.module').then((m) => m.FactoriesListModule)
      },
      {
        path: 'Inspector/factory-contacts/:id/:periodid',
        loadChildren: () =>
          import('../modules/inspector/factory-contacts/factory-contacts.module').then((m) => m.FactoryContactsModule)
      },
      {
        path: 'Inspector/factory-location/:id/:periodid',
        loadChildren: () =>
          import('../modules/inspector/factory-location/factory-location.module').then((m) => m.FactoryLocationModule)
      },
      {
        path: 'Inspector/factory-products/:id/:periodid',
        loadChildren: () =>
          import('../modules/inspector/factory-products/factory-products.module').then((m) => m.FactoryProductsModule)
      },
      {
        path: 'Inspector/factory-raw-materials/:id/:periodid',
        loadChildren: () =>
          import('../modules/inspector/factory-raw-materials/factory-raw-materials.module').then((m) => m.FactoryRawMaterialsModule)
      },
      {
        path: 'Inspector/financial-details/:id/:periodid',
        loadChildren: () =>
          import('../modules/inspector/financial-details/financial-details.module').then((m) => m.FinancialDetailsModule)
      },
      {
        path: 'Inspector/visits-records',
        loadChildren: () =>
          import('../modules/inspector/visits-records/visits-records.module').then((m) => m.VisitsRecordsModule)
      },
      {
        path: 'Inspector/factories-list',
        loadChildren: () =>
          import('../modules/inspector/factories-list/factories-list.module').then((m) => m.FactoriesListModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
