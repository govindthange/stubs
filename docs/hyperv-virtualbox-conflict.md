# The Problem

VirtualBox, VMware Workstation, and VMware Player do not work on machines with Hyper-V enabled

# The Solution

To resolve this conflict, create a new boot menu option that reboots the computer with Hyper-V temporarily disabled. This will allow switching between Hyper-V and VirtualBox, or any other type 2 hypervisor by rebooting and choosing to temporarily disable Hyper-V.

Ref: https://finsterbt.com/switch-between-hyper-v-and-virtualbox-on-windows-10/

## Steps

Create a new boot entry with the “hypervisorlaunchtype off” option using bcdedit like so:

```sh
Microsoft Windows [Version 6.3.9600]
(c) 2013 Microsoft Corporation. All rights reserved.

C:\Windows\system32>bcdedit /copy {current} /d "Disable Hyper-V"
The entry was successfully copied to {7bbbc4e7-60d0-11ea-8756-2c337a4d23e2}.
```

Now use the GUID from above like so:
```sh
C:\Windows\system32>bcdedit /set {7bbbc4e7-60d0-11ea-8756-2c337a4d23e2} hypervisorlaunchtype off
The operation completed successfully.

C:\Windows\system32>
```

Finally reboot the machine while holding down the shift key. You will be presented with a boot option to “Use another operating system”. Select your new “Disable Hyper-V” option. The machine will boot with Hyper-V disabled and VirtualBox will work.

# Root Cause Analysis

Hyper-V is a type 1 hypervisor, running directly on the host hardware. When Hyper-V is enabled Windows 8 is loaded as a virtual machine. Hyper-V loads before Windows and grabs control of the CPUs VT-x extensions. This means Windows no longer has access to the VT-x extensions of the CPU, which are needed by type 2 hypervisors.  Therefore, VirtualBox and VMWare Workstation cannot run.

VirtualBox and VMware Workstation (or VMware Player) are type 2 hypervisors, running as applications in Windows 8, which is shown as the blue box marked Operating system in the diagram. In this case, Windows 8 is communicating directly with the host hardware. Windows isn’t using the VT-x extensions, leaving them available for use by the type 2 hypervisors.

Because only one hypervisor at a time can take control of VT-x support, it is not possible to run a type 2 hypervisor while Hyper-V is enabled.

# Tips

Above we copied the {current} boot entry to a new entry with a description of “Disable Hyper-V”. Then we edited the new boot entry by adding a parameter: hypervisorlaunchtype off. The opposite option is hypervisorlaunchtype auto.

You can even create a batch file to force a quick reboot with the “Disable Hyper-V” boot option selected.
```sh
bcdedit.exe /bootsequence {<use your GUID that was displayed in step 2>}
shutdown.exe /r /t 0 /f
```
