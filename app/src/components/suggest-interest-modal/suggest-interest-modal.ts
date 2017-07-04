import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { InterestService } from '../../providers/interest-service/interest-service';

/**
 * Generated class for the SuggestInterestModalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'suggest-interest-modal',
  templateUrl: 'suggest-interest-modal.html'
})
export class SuggestInterestModalComponent {

  private suggestInterestForm: FormGroup;

  constructor(private nav: NavController,
    private interestService: InterestService,
    private form: FormBuilder,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController) {
    this.suggestInterestForm = form.group({
      suggestion: ['', Validators.required],
    });
  }

  submitSuggestion() {
    this.interestService.suggestInterest(
      this.suggestInterestForm.value.suggestion,
      this.onSubmitSuccess,
      this.onSubmitFailure
    );
  }

  onSubmitSuccess = (response: Response) => {
    let okAlert = this.alertCtrl.create({
      title: 'Thanks!',
      subTitle: `We'll consider your suggestion.`,
      buttons: [
        {
          text: 'OK', handler: () => {
            okAlert.dismiss().then(this.dismissModal);
          }
        }
      ],
    });

    okAlert.present();
  }

  onSubmitFailure = (response: Response) => {
    let failAlert = this.alertCtrl.create({
      title: 'Could not create your suggestion',
      subTitle: 'something failed, please try again',
      buttons: ['OK']
    });

    failAlert.present();
  }

  dismissModal = () => {
    this.viewCtrl.dismiss();
  }

}
