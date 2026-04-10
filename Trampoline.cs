using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Trampoline : MonoBehaviour
{   //Вход в триггер
    void OnTriggerEnter(Collider other)
    {   //Сила прыжка 10
       other.GetComponent<Jump>().jumpStrength = 10;  
    }
    //Выход из триггера
    void OnTriggerExit(Collider other)
    {   //Сила прыжка 2 
        other.GetComponent<Jump>().jumpStrength = 2;  
    }

}
