import numpy
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import minimize
import math


def function(x, a, b, c):

    if a <= 0 or math.isnan(c) or math.isnan(b) or math.isnan(a):
        return 0
    else:
        func = a / (1 + np.power(x - b, 2) / np.power(c, 2))
        return func

def sortKey(e):
    return e[1]

def subLor(allData, curves):
    ret = []
    for x in allData:
        hold = float(x[1]) - (
                float(curves[1]) / (1 + np.power(float(x[0] - curves[0]), 2) / (np.power(float(curves[2]), 2))))
        ret.append([x[0], hold])

    return ret

def findLor(allData):
    newData = sorted(allData, key=sortKey, reverse=True)
    amplitude = abs(newData[0][1])
    x0 = newData[0][0]
    if amplitude <= 0 or newData[1][1] <= 0:
        return (0, 0, 1)

    #Solving for dx from the equation and using f(x)=y-value closest to the peak and x to be x-value correspinding to the y-value
    dx = abs((float(newData[1][0]) - float(x0)) / float(np.power((float(amplitude) / float(newData[1][1])) - 1, 0.5)))

    if amplitude <= 0 or math.isnan(dx) or math.isnan(x0) or math.isnan(amplitude):
        dx = np.power(dx,0)
        amplitude = 0
        x0 = 0
        return (x0, amplitude, dx)
    else:

        return (x0, amplitude, dx)

def Decon(file):
    fileIn = open(file, "r+")

    Lines = fileIn.readlines()
    arrX = []
    arrY = []
    rawData = []

    count = 0
    for x in Lines:
        try:
            y = x.split()
            arrX.append(647 + (-96.4579 * float(y[0])) + (0.305 * np.power(float(y[0]), 2)) + (
                    -0.00031658 * np.power(float(y[0]), 3)) + (0.00000011319 * np.power(float(y[0]), 4)))
            arrY.append(float(y[1]))
            rawData.append([647 + (-96.4579 * float(y[0])) + (0.305 * np.power(float(y[0]), 2)) + (
                    -0.00031658 * np.power(float(y[0]), 3)) + (0.00000011319 * np.power(float(y[0]), 4)), float(y[1])])
        except:
            count += 1
    fileIn.close()

    curve = []
    curve.append(findLor(rawData))
    newData = subLor(rawData, curve[0])
    #curve.append(findLor(newData))
    #newData = subLor(newData, curve[1])
    ind = 0

    while curve[ind][1] >= 500:
        curve.append(findLor(newData))
        ind += 1
        newData = subLor(newData, curve[ind])
        if curve[ind][1] == 0:
            curve.remove(curve[ind])
            ind -= 1
            break
        if curve[ind][2] > 2000:
            curve.remove(curve[ind])
            ind -= 1

    fullEq = 0
    i = 0
    while i < len(curve):
        fullEq += function(arrX, curve[i][1], curve[i][0], curve[i][2])
        i += 1
    plt.plot(arrX,fullEq)

    o=0
    Curve = []
    while o < 3*len(curve):
        Curve.append('x'+str(o))
        o+=1

    def objective(Curve):
        l=0
        Function = 0
        while l<len(curve):
            Function += function(arrX, Curve[l*3+1], Curve[l*3], Curve[l*3+2])
            l+=1

        correlation_matrix = numpy.corrcoef(Function, arrY)
        correlation_coeficient = correlation_matrix[0, 1]
        r_squared = correlation_coeficient ** 2

        return 1/r_squared

    x0=curve
    result = minimize(objective, x0, method='SLSQP')

    counter = 0
    while counter*3 < len(result.x):
        try:
            fullEq = function(arrX, result.x[counter*3+1], result.x[counter*3], result.x[counter*3+2])
            plt.plot(arrX, fullEq)
            counter+=1
        except:
            counter = len(result.x)
    counter = 0
    plt.plot(arrX, arrY,'r-', label='data')
    #plt.show()
    values = []
    while counter * 3 < len(result.x):
        values.append(['curve'+ str(counter + 1),result.x[counter*3+1], result.x[counter*3], result.x[counter*3+2]])
        counter+=1


    return print("r^2 value================="+str(1/result.fun)), print(values),print('------------------------------------------' + file + '------------------------------------------')

#Deconvolution of 100 files from 4.txt to 103.txt
#the files must have 2 columns: X-values for wavenumbers and corresponding Y-values for intensities
number = 4
while number < 103:
    a_file = "/Users/rujan/Desktop/40 nm sorted/" + str(number) + ".txt"
    Decon(a_file)
    number += 1
    plt.show()