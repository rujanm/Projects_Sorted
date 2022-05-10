def list_to_right(A, K):
    list = []
    try:
        for element in A:
            list.append(element)
        for element in A:
            list.append(element)
        del list[:len(A)- K % len(A)]
        del list[len(A):]
    except ZeroDivisionError:
        list = A
    return list

print(list_to_right([1,2,3,4,5,6],0))
