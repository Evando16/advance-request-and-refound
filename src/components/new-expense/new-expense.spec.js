import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import pretty from 'pretty';
import NewExpense from './new-expense';

describe('NewExpenseComponent', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe('Snapshot tests', () => {
    it('should render new expense component', async () => {
      await act(async () => {
        render(
          <NewExpense toggleVision={() => { }} setSnackbar={() => { }} />,
          container,
        );
      });

      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
        "<div class=\\"MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded\\">
          <form>
            <div class=\\"MuiCardContent-root\\">
              <div><span>Nova despesa</span></div>
              <div>
                <div>
                  <div><span>Recibo, cupom ou nota fiscal*</span><svg aria-hidden=\\"true\\" focusable=\\"false\\" data-prefix=\\"fas\\" data-icon=\\"question-circle\\" class=\\"svg-inline--fa fa-question-circle fa-w-16 \\" role=\\"img\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\">
                      <path fill=\\"currentColor\\" d=\\"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z\\"></path>
                    </svg></div><label for=\\"contained-button-file\\"><span class=\\"MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary\\" tabindex=\\"0\\" role=\\"button\\" aria-disabled=\\"false\\" style=\\"border-style: dashed;\\"><span class=\\"MuiButton-label\\">Selecione um arquivo do seu computador</span><span class=\\"MuiTouchRipple-root\\"></span></span><input id=\\"contained-button-file\\" style=\\"display: none;\\" accept=\\".jpg,.png\\" type=\\"file\\"></label><span>A imagem deve estar no formato JPG ou PNG.</span>
                </div>
                <div>
                  <div style=\\"display: flex; flex-direction: column;\\">
                    <div class=\\"MuiFormControl-root\\"><label class=\\"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated Mui-required Mui-required\\" data-shrink=\\"false\\" id=\\"new-expense__type-label\\">Tipo<span aria-hidden=\\"true\\" class=\\"MuiFormLabel-asterisk MuiInputLabel-asterisk\\"> *</span></label>
                      <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl\\">
                        <div class=\\"MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input\\" tabindex=\\"0\\" role=\\"button\\" aria-haspopup=\\"listbox\\" aria-labelledby=\\"new-expense__type new-expense__type-select\\" id=\\"new-expense__type-select\\"><span>​</span></div><input aria-hidden=\\"true\\" tabindex=\\"-1\\" class=\\"MuiSelect-nativeInput\\" required=\\"\\" value=\\"\\"><svg class=\\"MuiSvgIcon-root MuiSelect-icon\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\">
                          <path d=\\"M7 10l5 5 5-5z\\"></path>
                        </svg>
                      </div>
                    </div>
                    <div class=\\"MuiFormControl-root MuiTextField-root\\"><label class=\\"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated Mui-required Mui-required\\" data-shrink=\\"false\\" for=\\"new-expense__description\\" id=\\"new-expense__description-label\\">Descrição da despesa<span aria-hidden=\\"true\\" class=\\"MuiFormLabel-asterisk MuiInputLabel-asterisk\\"> *</span></label>
                      <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl\\"><input aria-invalid=\\"false\\" id=\\"new-expense__description\\" required=\\"\\" type=\\"text\\" class=\\"MuiInputBase-input MuiInput-input\\" value=\\"\\"></div>
                    </div>
                    <div class=\\"MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal\\"><label class=\\"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated Mui-required Mui-required\\" data-shrink=\\"false\\" for=\\"new-expense__receipt-date\\" id=\\"new-expense__receipt-date-label\\">Data do comprovante<span aria-hidden=\\"true\\" class=\\"MuiFormLabel-asterisk MuiInputLabel-asterisk\\"> *</span></label>
                      <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedEnd\\"><input aria-invalid=\\"false\\" id=\\"new-expense__receipt-date\\" required=\\"\\" type=\\"text\\" class=\\"MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd\\" value=\\"\\">
                        <div class=\\"MuiInputAdornment-root MuiInputAdornment-positionEnd\\"><button class=\\"MuiButtonBase-root MuiIconButton-root\\" tabindex=\\"0\\" type=\\"button\\" aria-label=\\"change date\\"><span class=\\"MuiIconButton-label\\"><svg class=\\"MuiSvgIcon-root\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\"><path d=\\"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z\\"></path><path fill=\\"none\\" d=\\"M0 0h24v24H0z\\"></path></svg></span><span class=\\"MuiTouchRipple-root\\"></span></button></div>
                      </div>
                    </div>
                    <div class=\\"MuiFormControl-root\\"><label class=\\"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated Mui-required Mui-required\\" data-shrink=\\"false\\" id=\\"new-expense__currency-label\\">Moeda<span aria-hidden=\\"true\\" class=\\"MuiFormLabel-asterisk MuiInputLabel-asterisk\\"> *</span></label>
                      <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl\\">
                        <div class=\\"MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input\\" tabindex=\\"0\\" role=\\"button\\" aria-haspopup=\\"listbox\\" aria-labelledby=\\"new-expense__currency new-expense__currency-select\\" id=\\"new-expense__currency-select\\"><span>​</span></div><input aria-hidden=\\"true\\" tabindex=\\"-1\\" class=\\"MuiSelect-nativeInput\\" required=\\"\\" value=\\"\\"><svg class=\\"MuiSvgIcon-root MuiSelect-icon\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\">
                          <path d=\\"M7 10l5 5 5-5z\\"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class=\\"MuiCardActions-root MuiCardActions-spacing\\">
              <div class=\\"MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-justify-xs-flex-end\\">
                <div class=\\"MuiGrid-root MuiGrid-item\\"><button class=\\"MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary\\" tabindex=\\"0\\" type=\\"button\\"><span class=\\"MuiButton-label\\">Cancelar</span><span class=\\"MuiTouchRipple-root\\"></span></button></div>
                <div class=\\"MuiGrid-root MuiGrid-item\\"><button class=\\"MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary\\" tabindex=\\"0\\" type=\\"button\\"><span class=\\"MuiButton-label\\">Salvar</span><span class=\\"MuiTouchRipple-root\\"></span></button></div>
              </div>
            </div>
          </form>
        </div>"
      `);
    });
  });
});
