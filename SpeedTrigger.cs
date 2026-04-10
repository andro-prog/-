using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpeedTrigger : MonoBehaviour
{
    public float speedFactor = 2.5f;
    // Update is called once per frame
    void OnTriggerEnter(Collider other)
    {   //ускорение
        other.GetComponent<FirstPersonMovement>().runSpeed *= speedFactor;  
    }
    void OnTriggerExit(Collider other)
    {   //замедление   
        other.GetComponent<FirstPersonMovement>().runSpeed /= speedFactor;  
    }
}
