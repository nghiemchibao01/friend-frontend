import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FieldConfig } from '../../models/form/field-config';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm implements OnInit {
  private formService = inject(FormService);
  form!: FormGroup;

  @Input() fields: FieldConfig[] = [];
  @Input() data: any;
  @Input() submitLabel: string = 'Submit';

  @Output() submitted = new EventEmitter<any>();

  ngOnInit(): void {
    this.form = this.formService.buildFormGroup(this.fields);

    if (this.data) {
      this.formService.patchForm(this.form, this.data);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const model = this.formService.toModel<any>(this.form);
      this.submitted.emit(model); // ✅ emit event
    }
  }
}
