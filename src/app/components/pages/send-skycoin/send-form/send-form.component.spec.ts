import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SendFormComponent } from './send-form.component';
import { WalletService } from '../../../../services/wallet/wallet.service';
import { SpendingService } from '../../../../services/wallet/spending.service';
import { CoinService } from '../../../../services/coin.service';
import { BlockchainService } from '../../../../services/blockchain.service';
import { CustomMatDialogService } from '../../../../services/custom-mat-dialog.service';
import { NavBarService } from '../../../../services/nav-bar.service';
import { PriceService } from '../../../../services/price.service';
import { MockTranslatePipe,
  MockWalletService,
  MockSpendingService,
  MockCoinService,
  MockBlockchainService,
  MockCustomMatDialogService,
  MockNavBarService,
  MockPriceService } from '../../../../utils/test-mocks';

describe('SendFormComponent', () => {
  let component: SendFormComponent;
  let fixture: ComponentFixture<SendFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendFormComponent, MockTranslatePipe ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ MatSnackBarModule ],
      providers: [
        FormBuilder,
        { provide: WalletService, useClass: MockWalletService },
        { provide: SpendingService, useClass: MockSpendingService },
        { provide: CoinService, useClass: MockCoinService },
        { provide: BlockchainService, useClass: MockBlockchainService },
        { provide: CustomMatDialogService, useClass: MockCustomMatDialogService },
        { provide: NavBarService, useClass: MockNavBarService },
        { provide: PriceService, useClass: MockPriceService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
