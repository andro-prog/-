using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Teleport : MonoBehaviour
{   //точка телепорта
    public Transform teleportPoint;
    void OnTriggerEnter(Collider other)
    {   //tp
        other.transform.position = teleportPoint.position;
        other.transform.Rotate(0f,180f,0f,Space.Self);
    }
}
