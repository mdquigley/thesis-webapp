Blockly.Blocks['mq_4stepToneloop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('loop')
        this.appendDummyInput()
            .appendField('subdivision')
            .appendField(new Blockly.FieldDropdown([["1n", "1n"], ["2n", "2n"], ["4n", "4n"], ["8n", "8n"], ["16n", "16n"]]), "subdivision");
        this.setFieldValue("4n", 'subdivision');
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
        this.setPreviousStatement(true, null);
        this.setOutput(false);
        this.setColour(210);
    }
};

Blockly.JavaScript['mq_4stepToneloop'] = function (block) {
    let note1 = Blockly.JavaScript.valueToCode(block, 'PITCH1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note2 = Blockly.JavaScript.valueToCode(block, 'PITCH2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note3 = Blockly.JavaScript.valueToCode(block, 'PITCH3', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let note4 = Blockly.JavaScript.valueToCode(block, 'PITCH4', Blockly.JavaScript.ORDER_FUNCTION_CALL) || null;
    let subdivision = block.getFieldValue('subdivision');

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


    sequences[synth] = [(note1 ? note1 : null), (note2 ? note2 : null), (note3 ? note3 : null), (note4 ? note4 : null)];
    noteLengths[synth] = length;

    synthList[synth].sequence = [(note1 ? note1 : null), (note2 ? note2 : null), (note3 ? note3 : null), (note4 ? note4 : null)];
    console.log(synthList[synth])

    code = `
    let ${synth}Seq = new Tone.Loop((time) => {
        if (eval(synthList['${synth}'].sequence[synthList['${synth}'].currentCount]) !== null) {
            synthList['${synth}'].synth.triggerAttackRelease((eval(synthList['${synth}'].sequence[synthList['${synth}'].currentCount]) ? Tone.Frequency(eval(synthList['${synth}'].sequence[synthList['${synth}'].currentCount]), 'midi') : null), '8n');
        }
        synthList['${synth}'].currentCount = (synthList['${synth}'].currentCount + 1) % 4;
    }, synthList['${synth}'].subdivision).start(0);\n
    `


    // code = `
    //         let ${synth}Counter = 0;

    //         let ${synth}Seq = new Tone.Loop((time) => {
    //             ${synth}ChangeType();
    //             //${synth}AmpEnv();
    //             if (panvols['${synth}']) {
    //                 ${synth}ChangePanVol();
    //             }
    //             updateInterval(${synth}Seq, subdivisions['${synth}']);
    //             if (sequences['${synth}'][${synth}Counter % 4] !== null) {
    //                 ${synth}.triggerAttackRelease(((eval(sequences['${synth}'][${synth}Counter % 4])) ? Tone.Frequency(eval(sequences['${synth}'][${synth}Counter % 4]), "midi") : null), '8n');

    //             }
    //             ${synth}Counter++;
    //         }, subdivisions['${synth}']).start(0);

    //     `;


    return code;
};