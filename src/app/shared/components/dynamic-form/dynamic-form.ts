import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FieldConfig } from '../../models/form/field-config';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/form-service';
import { FieldType } from '../../models/form/field-type';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm implements OnInit, OnChanges {
  FieldType = FieldType;
  private formService = inject(FormService);
  form!: FormGroup;

  @Input() fields: FieldConfig[] = [];
  @Input() data: any;
  @Input() submitLabel: string = 'Submit';

  @Output() submitted = new EventEmitter<any>();
  @Output() changed = new EventEmitter<any>();

  ngOnInit(): void {
    this.form = this.formService.buildFormGroup(this.fields);
    console.log(this.fields);
    console.log(this.data);
    if (this.data) {
      this.formService.patchForm(this.form, this.data);
    }
  }

  ngOnChanges(): void {
    if (!this.form) {
      this.form = this.formService.buildFormGroup(this.fields);
    }
    if (this.data) {
      this.formService.patchForm(this.form, this.data);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const model = this.formService.toModel<any>(this.form);
      this.submitted.emit(model);
    }
  }

  onCheckboxGroupChange(field: FieldConfig) {
    const selected = this.formService.getCheckboxGroupValue(this.form, field);
    this.changed.emit({ [field.key]: selected });
  }
}
