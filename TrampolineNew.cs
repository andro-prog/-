using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TrampolineNew : MonoBehaviour
{   //сила прыжка
    public float jumpStrength = 10;
    void OnTriggerEnter(Collider other)
    {   //прыжок
        Rigidbody rigidbody = other.GetComponent<Rigidbody>();
        rigidbody.AddForce(Vector3.up * 100 * jumpStrength);
        
            
        
    }
}
