Blockly.Blocks['mq_8stepToneloop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('loop')
        this.appendDummyInput()
            .appendField('notelength')
            .appendField(new Blockly.FieldDropdown([["1n", "1n"], ["2n", "2n"], ["4n", "4n"], ["8n", "8n"], ["16n", "16n"]]), "notelength");
        this.setFieldValue("8n", 'notelength');
        this.appendDummyInput()
            .appendField('subdivision')
            .appendField(new Blockly.FieldDropdown([["1n", "1n"], ["2n", "2n"], ["4n", "4n"], ["8n", "8n"], ["16n", "16n"]]), "subdivision");
        this.setFieldValue("8n", 'subdivision');
        this.appendValueInput('PITCH1')
            .setCheck('Number')
            .appendField('Note 1');
        this.appendValueInput('PITCH2')
            .setCheck('Number')
            .appendField('Note 2');
        this.appendValueInput('PITCH3')
            .setCheck('Number')
            .appendField('Note 3');
        this.appendValueInput('PITCH4')
            .setCheck('Number')
            .appendField('Note 4');
        this.appendValueInput('PITCH5')
            .setCheck('Number')
            .appendField('Note 5');
        this.appendValueInput('PITCH6')
            .setCheck('Number')
            .appendField('Note 6');
        this.appendValueInput('PITCH7')
            .setCheck('Number')
            .appendField('Note 7');
        this.appendValueInput('PITCH8')
            .setCheck('Number')
            .appendField('Note 8');
        this.setPreviousStatement(true, null);
        this.setOutput(false);
        this.setColour(210);
    }
};

Blockly.JavaScript['mq_8stepToneloop'] = function (block) {
    let note1 = Blockly.JavaScript.valueToCode(block, 'PITCH1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note2 = Blockly.JavaScript.valueToCode(block, 'PITCH2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note3 = Blockly.JavaScript.valueToCode(block, 'PITCH3', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note4 = Blockly.JavaScript.valueToCode(block, 'PITCH4', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note5 = Blockly.JavaScript.valueToCode(block, 'PITCH5', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note6 = Blockly.JavaScript.valueToCode(block, 'PITCH6', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note7 = Blockly.JavaScript.valueToCode(block, 'PITCH7', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note8 = Blockly.JavaScript.valueToCode(block, 'PITCH8', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let subdivision = block.getFieldValue('subdivision');
    let notelength = block.getFieldValue('notelength');

    let code = "";
    let synth;

    const topBlock = block.getTopStackBlock();
    if (topBlock) {
        synth = topBlock.getFieldValue('name');
    }

    subdivisions[synth] = subdivision;

    // '4n' = [x,x,x,x]
    // '8n' = [[x,x],[x,x]]
    // '16n' = [[x,x,x,x]]


    sequences[synth] = [(note1 ? note1 : null), (note2 ? note2 : null), (note3 ? note3 : null), (note4 ? note4 : null), (note5 ? note5 : null), (note6 ? note6 : null), (note7 ? note7 : null), (note8 ? note8 : null)];

    noteLengths[synth] = notelength;

    code = `
    let ${synth}Counter = 0;
        
          
    if (${synth} !== null) {
  
    let ${synth}Seq = new Tone.Loop((time) => {
        ${synth}ChangeType();
                //${synth}AmpEnv();
                ${synth}ChangeVol(vols['${synth}']);
                updateInterval(${synth}Seq, subdivisions['${synth}']);
        if (sequences['${synth}'][${synth}Counter % 8] !== null) {
            ${synth}.triggerAttackRelease(((eval(sequences['${synth}'][${synth}Counter % 8])) ? Tone.Frequency(eval(sequences['${synth}'][${synth}Counter % 8]), "midi") : null), noteLengths['${synth}']);
        
        }
        ${synth}Counter++;
    }, subdivisions['${synth}']).start(0);
}
        `;


    return code;
};