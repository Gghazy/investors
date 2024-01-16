import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
  {
  path: '',
  component: ModulesComponent,
  children:[
    {
      path: 'actual-production-and-designed-capacity',
      loadChildren: () =>
        import('../modules/actual-production-and-designed-capacity/actual-production-and-designed-capacity.module').then((m) => m.ActualProductionAndDesignedCapacityModule)
    },
    {
      path: 'actual-raw-materials',
      loadChildren: () =>
        import('../modules/actual-raw-materials/actual-raw-materials.module').then((m) => m.ActualRawMaterialsModule)
    },
    {
      path: 'basic-info',
      loadChildren: () =>
        import('../modules/basic-info/basic-info.module').then((m) => m.BasicInfoModule)
    },
    {
      path: 'customs-items-check',
      loadChildren: () =>
        import('../modules/customs-items-check/customs-items-check.module').then((m) => m.CustomsItemsCheckModule)
    },
    {
      path: 'customs-items-update',
      loadChildren: () =>
        import('../modules/customs-items-update/customs-items-update.module').then((m) => m.CustomsItemsUpdateModule)
    },
    { path: '', redirectTo: '/pages/factories-list', pathMatch: 'full' },

    {
      path: 'factories-list',
      loadChildren: () =>
        import('../modules/factory/factory.module').then((m) => m.FactoryModule)
    },
    {
      path: 'factory-contacts',
      loadChildren: () =>
        import('../modules/factory-contacts/factory-contacts.module').then((m) => m.FactoryContactsModule)
    },
    {
      path: 'factory-landing',
      loadChildren: () =>
        import('../modules/factory-landing/factory-landing.module').then((m) => m.FactoryLandingModule)
    },
    {
      path: 'factory-location',
      loadChildren: () =>
        import('../modules/factory-location/factory-location.module').then((m) => m.FactoryLocationModule)
    },
    {
      path: 'factory-products',
      loadChildren: () =>
        import('../modules/factory-products/factory-products.module').then((m) => m.FactoryProductsModule)
    },
    {
      path: 'factory-raw-materials',
      loadChildren: () =>
        import('../modules/factory-raw-materials/factory-raw-materials.module').then((m) => m.FactoryRawMaterialsModule)
    },
    {
      path: 'financial-details',
      loadChildren: () =>
        import('../modules/financial-details/financial-details.module').then((m) => m.FinancialDetailsModule)
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
