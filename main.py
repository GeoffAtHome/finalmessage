def on_button_pressed_a():
    global delay
    delay = delay1
    radio.send_value("Delay", delay)
    SplitMessageAndSend(msg1)
    DisplayMessage(MyID, msg1, delay)
input.on_button_pressed(Button.A, on_button_pressed_a)

def ProcessMessage(thisID: number, thisMessage: str, thisDelay: number):
    global messagePart1
    if thisMessage.char_at(0) == "0":
        messagePart1 = ""
    elif thisMessage.char_at(0) == "1":
        messagePart1 = "" + messagePart1 + thisMessage.substr(2, 19)
    else:
        DisplayMessage(thisID, messagePart1, thisDelay)
def DisplayMessage(thisId: number, thisMessage2: str, thisDelay2: number):
    global loop, index
    basic.clear_screen()
    basic.pause(thisId * thisDelay2)
    loop = 1 + (len(thisMessage2) - thisId)
    index = thisId
    for index2 in range(loop):
        basic.show_string(thisMessage2.char_at(index))
        index += 1

def on_received_string(receivedString):
    ProcessMessage(MyID, receivedString, delay)
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global delay
    delay = delay2
    radio.send_value("Delay", delay)
    SplitMessageAndSend(msg2)
    DisplayMessage(MyID, msg2, delay)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global delay
    if name == "Delay":
        delay = value
radio.on_received_value(on_received_value)

def SplitMessageAndSend(thisMessage3: str):
    global loop
    loop = len(thisMessage3)
    radio.send_string("0^")
    radio.send_string("1^" + thisMessage3.substr(0, 16))
    radio.send_string("1^" + thisMessage3.substr(16, 16))
    radio.send_string("2^")

def on_data_received():
    global messagePart1
    messagePart1 = serial.read_until(serial.delimiters(Delimiters.NEW_LINE))
    SplitMessageAndSend(messagePart1)
    DisplayMessage(MyID, messagePart1, delay)
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

index = 0
loop = 0
messagePart1 = ""
delay = 0
delay2 = 0
delay1 = 0
msg2 = ""
msg1 = ""
MyID = 0
MyID = 0
msg1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
msg2 = ""
radio.set_group(1)
basic.show_number(MyID)
delay1 = 0
delay2 = 400
delay = delay1
serial.redirect(SerialPin.USB_TX, SerialPin.USB_RX, BaudRate.BAUD_RATE115200)