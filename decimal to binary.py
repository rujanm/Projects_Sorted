def binary_gap(integer):
    reversed_binary = ''
    binary = ''
    while integer != 0:
        reversed_binary += str(integer % 2)
        integer = int(integer / 2)
    counter = 1
    while counter <= len(reversed_binary):
        binary += reversed_binary[len(reversed_binary) - counter]
        counter += 1
    counter = 0
    number_of_gaps = []
    for element in binary:
        if element == '1':
            number_of_gaps.append(counter)
            counter = 0
        else:
            counter +=1
    return binary, max(number_of_gaps)
print(binary_gap())
