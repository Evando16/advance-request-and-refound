import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import pretty from 'pretty';
import NewExpense from './new-expense';

// import saveExpense from './new-expense-service';

describe('NewExpenseComponent', () => {
  // jest.mock('./new-expense-service');
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
        render(<NewExpense toggleVision={() => { }} setSnackbar={() => { }} />, container);
      });

      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
        "<div class=\\"MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded\\">
          <form>
            <div class=\\"MuiCardContent-root\\">
              <div><span>Nova despesa</span></div>
              <div>
                <div>
                  <div><span>Recibo, cupom ou nota fiscal*</span><svg class=\\"MuiSvgIcon-root MuiSvgIcon-fontSizeSmall\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\">
                      <path d=\\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z\\"></path>
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
